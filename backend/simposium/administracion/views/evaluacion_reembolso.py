from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from django.db import transaction, DatabaseError
from django.utils import timezone

from ..models import EvaluacionReembolso, Pago, Ticket
from ..serializers import EvaluacionReembolsoSerializer
from ..permisos import PermisoEvaluacionesReembolso


class EvaluacionReembolsoViewSet(viewsets.ModelViewSet):
    serializer_class = EvaluacionReembolsoSerializer
    queryset = EvaluacionReembolso.objects.all()
    permission_classes = [PermisoEvaluacionesReembolso]

    def filter_queryset(self, queryset):
        es_admin = False
        es_asistente = False
        # se busca si el usuario es admin y/o asistente
        for group in self.request.user.groups.all():
            es_admin = es_admin or group.name == 'ADMIN'
            es_asistente = es_asistente or group.name == 'ASISTENTE'
        if es_asistente and not es_admin:
            return queryset.filter(pago=Pago.objects.get(pk=self.request.user.id)).order_by('-fecha-hora')
        return queryset.order_by('-fecha_hora')

    def perform_create(self, serializer):
        pago = Pago.objects.get(pk=self.request.data['pago'])
        evaluaciones = EvaluacionReembolso.objects.filter(pago=pago)\
            .filter(resultado=EvaluacionReembolso.REEMBOLSADO)
        if evaluaciones.exists():
            raise ValidationError('Este pago ya fue reembolsado')
        if self.request.data['resultado'] == EvaluacionReembolso.ACEPTADO:
            evaluaciones = EvaluacionReembolso.objects.filter(pago=pago) \
                .filter(resultado=EvaluacionReembolso.ACEPTADO)
            if evaluaciones.exists():
                raise ValidationError('El reembolso de este pago ya fue aceptado')
            pago.estado = Pago.REEMBOLSO_APROBADO
        elif self.request.data['resultado'] == EvaluacionReembolso.RECHAZADO:
            evaluaciones = EvaluacionReembolso.objects.filter(pago=pago) \
                .filter(resultado=EvaluacionReembolso.ACEPTADO)
            if evaluaciones.exists():
                raise ValidationError('El reembolso de este pago ya fue aceptado')
            pago.estado = Pago.ACEPTADO
        elif self.request.data['resultado'] == EvaluacionReembolso.REEMBOLSADO:
            pago.estado = Pago.REEMBOLSADO

        try:
            with transaction.atomic():
                serializer.save(usuario=self.request.user, fecha_hora=timezone.now())
                pago.save()
                # cuando se acepta el reembolso de un pago, se invalida el ticket asociado
                if self.request.data['resultado'] == EvaluacionReembolso.ACEPTADO:
                    ticket = Ticket.objects.get(asistente=pago.titular)
                    ticket.estado = Ticket.INVALIDO
                    ticket.save()
        except DatabaseError as error:
            raise ValidationError(str(error))


@api_view(['GET'])
@permission_classes([PermisoEvaluacionesReembolso])
def reembolsos_de_pago(request, pago_id):
    try:
        pago = Pago.objects.get(pk=pago_id)
    except Pago.DoesNotExist:
        return Response({"detail": "El pago no existe"})

    es_admin = False
    es_asistente = False

    for group in request.user.groups.all():
        es_admin = es_admin or group.name == 'ADMIN'
        es_asistente = es_asistente or group.name == 'ASISTENTE'

    evaluaciones = EvaluacionReembolso.objects.filter(pago=pago).order_by('-fecha_hora')
    if es_asistente and not es_admin:
        if pago.titular.usuario.id != request.user.id:
            raise ValidationError("No tienes permiso para ver las evaluaciones de reembolso de este pago")

    serializer = EvaluacionReembolsoSerializer(evaluaciones, many=True)
    return Response(serializer.data)