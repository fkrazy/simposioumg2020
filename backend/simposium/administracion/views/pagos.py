from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response

from ..models import Pago
from ..serializers import PagoSerializer
from ..permisos import PermisoPagos


class PagoViewSet(viewsets.ModelViewSet):
    serializer_class = PagoSerializer
    queryset = Pago.objects.all()
    permission_classes = [PermisoPagos]

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

    # devuelve los pagos que han sido aceptados
    @action(detail=False, methods=['GET'])
    def aceptados(self, request):
        aceptados = self.filter_queryset(self.get_queryset())\
            .filter(estado=Pago.ACEPTADO)\
            .order_by('fecha_registro')

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
            .filter(estado=Pago.ACEPTADO)\
            .order_by('fecha_registro')

        page = self.paginate_queryset(rechazados)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(rechazados, many=True)
        return Response(serializer.data)