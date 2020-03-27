from django.db.models import ProtectedError
from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_403_FORBIDDEN,
    HTTP_400_BAD_REQUEST
)

from ..models import Pago
from ..serializers import ReadPagoSerializer, CreatePagoSerializer
from ..permisos import PermisoPagos


class PagoViewSet(viewsets.ModelViewSet):
    serializer_class = ReadPagoSerializer
    queryset = Pago.objects.all()
    permission_classes = [PermisoPagos]

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return CreatePagoSerializer
        return ReadPagoSerializer

    def filter_queryset(self, queryset):
        for g in self.request.user.groups.all():
            if g.name == 'ASISTENTE':
                return queryset.filter(titular=self.request.user.asistente)
        return queryset

    # devuelve los pagos pendientes de validacion
    @action(detail=False, methods=['GET'])
    def pendientes(self, request):
        pendientes_validacion = self.filter_queryset(self.get_queryset()) \
            .filter(estado=Pago.PENDIENTE_VALIDACION) \
            .order_by('fecha_registro')

        page = self.paginate_queryset(pendientes_validacion)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(pendientes_validacion, many=True)
        return Response(serializer.data)

    # devuelve los pagos que han solicitado reembolso
    @action(detail=False, methods=['GET'])
    def reembolsos(self, request):
        solicitud_reembolsos = self.filter_queryset(self.get_queryset()).filter(estado=Pago.EVALUACION_REEMBOLSO)

        page = self.paginate_queryset(solicitud_reembolsos)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(solicitud_reembolsos, many=True)
        return Response(serializer.data)

    # devuelve los pagos cuyo reembolso fue aprobado
    @action(detail=False, methods=['GET'])
    def reembolsos_aprobados(self, request):
        pagos = self.filter_queryset(self.get_queryset()).filter(estado=Pago.REEMBOLSO_APROBADO)

        page = self.paginate_queryset(pagos)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(pagos, many=True)
        return Response(serializer.data)

    # devuelve los pagos que ya han sido reembolsados
    @action(detail=False, methods=['GET'])
    def reembolsados(self, request):
        pagos = self.filter_queryset(self.get_queryset()).filter(estado=Pago.REEMBOLSADO)

        page = self.paginate_queryset(pagos)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(pagos, many=True)
        return Response(serializer.data)

    # devuelve los pagos que han sido aceptados
    @action(detail=False, methods=['GET'])
    def aceptados(self, request):
        aceptados = self.filter_queryset(self.get_queryset())\
            .filter(estado=Pago.ACEPTADO)\
            .order_by('fecha', 'hora')

        page = self.paginate_queryset(aceptados)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(aceptados, many=True)
        return Response(serializer.data)

    # devuelve los pagos que han sido rechazados
    @action(detail=False, methods=['GET'])
    def rechazados(self, request):
        rechazados = self.filter_queryset(self.get_queryset())\
            .filter(estado=Pago.VALIDACION_RECHAZADA)\
            .order_by('fecha_registro')

        page = self.paginate_queryset(rechazados)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(rechazados, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        es_asistente = False
        for group in request.user.groups.all():
            if group.name == 'ASISTENTE':
                es_asistente = True

        if not es_asistente:
            return Response({"detail": "No tienes permiso para crear pagos"}, status=HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(data=request.data)

        serializer.fecha_registro = timezone.now()
        serializer.estado = Pago.PENDIENTE_VALIDACION
        serializer.titular = request.user.asistente

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(ReadPagoSerializer(request.user.asistente.pago).data, status=HTTP_201_CREATED, headers=headers)


    def update(self, request, *args, **kwargs):
        # partial = kwargs.pop('partial', False)
        instance = self.get_object()

        es_admin = False
        es_asistente = False

        for group in request.user.groups.all():
            es_admin = es_admin or group.name == 'ADMIN'
            es_asistente = es_asistente or group.name == 'ASISTENTE'

        if not(es_admin or es_asistente):
            return Response({"detail": "No tienes permiso para actualizar pagos"}, status=HTTP_403_FORBIDDEN)
        if instance.estado == Pago.REEMBOLSADO:
            return Response({"detail": "Este pago ya no puede ser actualizado"}, status=HTTP_400_BAD_REQUEST)

        solicitando_reembolso = instance.estado == Pago.ACEPTADO and request.data['estado'] == Pago.EVALUACION_REEMBOLSO

        datos = {}
        datos['titular_id'] = instance.titular.usuario.id

        if not solicitando_reembolso and es_admin:
            if request.data['codigo_pago']:
                datos['codigo_pago'] = request.data['codigo_pago']
            # else:
            #     datos['codigo_pago'] = instance.codigo_pago
            if request.data['cuenta_id']:
                datos['cuenta_id'] = request.data['cuenta_id']
            # else:
            #     datos['cuenta_id'] = instance.cuenta.id
            if request.data['fecha']:
                datos['fecha'] = request.data['fecha']
            # else:
            #     datos['fecha'] = instance.fecha
            if request.data['hora']:
                datos['hora'] = request.data['hora']
            # else:
            #     datos['hora'] = instance.hora
            if request.data['estado'] and instance.estado != request.data['estado']:
                new_estado = request.data['estado']
                if ((new_estado == Pago.VALIDACION_RECHAZADA or new_estado == Pago.ACEPTADO) and instance.estado == Pago.PENDIENTE_VALIDACION) \
                        or (new_estado == Pago.REEMBOLSO_APROBADO and instance.estado == Pago.EVALUACION_REEMBOLSO)\
                        or (new_estado == Pago.REEMBOLSADO and instance.estado == Pago.REEMBOLSO_APROBADO):
                    datos['estado'] = request.data['estado']
                    if new_estado == Pago.ACEPTADO:
                        pass # crear ticket
                    if new_estado == Pago.REEMBOLSO_APROBADO:
                        pass # invalidar ticket, invalidar asignaciones a conferencias
                else:
                    raise ValidationError("Estado inválido")
            # else:
            #     datos['estado'] = instance.estado
            # if request.data['foto']:
            #     datos['foto'] = request.data['foto']

        if not solicitando_reembolso and es_asistente:
            if request.data['codigo_pago']:
                datos['codigo_pago'] = request.data['codigo_pago']
            # elif not es_admin:
            #     datos['codigo_pago'] = instance.codigo_pago
            if request.data['cuenta_id']:
                datos['cuenta_id'] = request.data['cuenta_id']
            # elif not es_admin:
            #     datos['cuenta_id'] = instance.cuenta.id
            if request.data['foto']:
                datos['foto'] = request.data['foto']
            if not es_admin and request.data['estado']:
                if (instance.estado == Pago.VALIDACION_RECHAZADA and request.data['estado'] == Pago.PENDIENTE_VALIDACION)\
                        or (instance.estado == Pago.ACEPTADO and request.data['estado'] == Pago.EVALUACION_REEMBOLSO):
                    datos['estado'] = request.data['estado']
                elif instance.estado != request.data['estado']:
                    raise PermissionDenied("No tienes permiso para cambiar el estado de tu pago")
            datos['fecha_registro'] = str(timezone.now())

        if not solicitando_reembolso:
            serializer = self.get_serializer(instance, data=datos, partial=True)
        else:
            serializer = self.get_serializer(instance, data={"estado": Pago.EVALUACION_REEMBOLSO}, partial=True)

        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(ReadPagoSerializer(instance).data)

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, args, kwargs)
        except ProtectedError:
            return Response({"detail": 'Otros registros referencian a este pago'}, status=status.HTTP_400_BAD_REQUEST )
