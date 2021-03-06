from rest_framework import viewsets, generics
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.utils import timezone
from django.db import transaction, DatabaseError, IntegrityError

import qrcode
from io import BytesIO
import base64

from ..models import ValidacionPago, Pago, Ticket, Reservacion
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
            return queryset.filter(pago=Pago.objects.get(pk=self.request.user.id)).order_by('-fecha-hora')
        return queryset.order_by('-fecha_hora')

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

        try:
            with transaction.atomic():
                serializer.save(usuario=self.request.user, fecha_hora=timezone.now())
                pago.save()
                if self.request.data['resultado'] == ValidacionPago.ACEPTADO:
                    Reservacion.objects.filter(asistente=pago.titular).update(estado=Reservacion.CONFIRMADA)
                    usuario = pago.titular.usuario
                    ticket = Ticket(asistente=pago.titular, codigo_qr='data:image/png;base64,' +
                                                                      crear_qr(f'{usuario.id}-{usuario.password}'))
                    ticket.save()
                elif self.request.data['resultado'] == ValidacionPago.RECHAZADO:
                    Reservacion.objects.filter(asistente=pago.titular).delete()
        except DatabaseError as error:
            raise ValidationError(str(error))


@api_view(['GET'])
@permission_classes([PermisoValidacionesPago])
def validaciones_de_pago(request, pago_id):
    try:
        pago = Pago.objects.get(pk=pago_id)
    except Pago.DoesNotExist:
        return Response({"detail": "El pago no existe"})

    es_admin = False
    es_asistente = False

    for group in request.user.groups.all():
        es_admin = es_admin or group.name == 'ADMIN'
        es_asistente = es_asistente or group.name == 'ASISTENTE'

    validaciones = ValidacionPago.objects.filter(pago=pago).order_by('-fecha_hora')
    if es_asistente and not es_admin:
        if pago.titular.usuario.id != request.user.id:
            raise ValidationError("No tienes permiso para ver las validaciones de este pago")

    serializer = ValidacionPagoSerializer(validaciones, many=True)
    return Response(serializer.data)


def crear_qr(datos):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=4,
        border=4
    )
    qr.add_data(datos)
    qr.make(fit=True)

    img = qr.make_image()
    buffered = BytesIO()
    img.save(buffered, format='PNG')
    return base64.b64encode(buffered.getvalue()).decode('utf-8')