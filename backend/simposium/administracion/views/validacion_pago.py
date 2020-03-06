from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone

from ..models import ValidacionPago, Pago
from ..serializers import ValidacionPagoSerializer
from ..permisos import PermisoValidacionesPago


class ValidacionPagoViewSet(viewsets.ModelViewSet):
    serializer_class = ValidacionPagoSerializer
    queryset = ValidacionPago.objects.all()
    permission_classes = [PermisoValidacionesPago]

    def filter_queryset(self, queryset):
        es_admin = False
        es_asistente = False
        # se busca si el usuario es admin y/o asistente
        for group in self.request.user.groups.all():
            if group.name == 'ADMIN':
                es_admin = True
            if group.name == 'ASISTENTE':
                es_asistente = True
        if es_asistente and not es_admin:
            return queryset.filter(pago=Pago.get(pk=self.request.user.id))
        return queryset

    def perform_create(self, serializer):
        pago = Pago.objects.get(pk=self.request.data['pago'])
        queryaceptado = ValidacionPago.objects.filter(pago=pago)\
            .filter(resultado=ValidacionPago.ACEPTADO)
        if queryaceptado.exists():
            raise ValidationError('Este pago ya fue aceptado')
        if self.request.data['resultado'] == ValidacionPago.ACEPTADO:
            pago.estado = Pago.ACEPTADO
        elif self.request.data['resultado'] == ValidacionPago.RECHAZADO:
            pago.estado = Pago.VALIDACION_RECHAZADA
        serializer.save(usuario=self.request.user, fecha_hora=timezone.now())
        pago.save()