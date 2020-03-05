from django.db import models
from django.utils import timezone

from .asistentes import Asistente
from .cuentas import Cuenta

class Pago(models.Model):
    PENDIENTE_VALIDACION = 1     # cuando el usuario registra el pago y lo envía para validacion
    VALIDACION_RECHAZADA = 2    # cuando el administrador rechaza el pago por ser inválido o tener datos erróneos, etc.
    ACEPTADO = 3                # el pago ha sido aceptado como válido
    EVALUACION_REEMBOLSO = 4     # cuando el usuario ya pagó y pide un reembolso, en este estado el reembolso todavía debe ser evaluado por un administrador
    REEMBOLSO_APROBADO = 5     # cuando el reembolso del pago ha sido aprobado pero aún no se ha hecho efectivo, es decir se aún no se devuelve el dinero
    REEMBOLSADO = 6     # cuando el dinero del pago ha sido devuelto

    ESTADOS = (
        (PENDIENTE_VALIDACION, 'Pendiente'),
        (VALIDACION_RECHAZADA, 'Rechazado'),
        (ACEPTADO, 'Aceptado'),
        (EVALUACION_REEMBOLSO, 'Reembolso solicitado'),
        (REEMBOLSO_APROBADO, 'Reembolso aprobado'),
        (REEMBOLSADO, 'Reembolsado')
    )

    titular = models.OneToOneField(Asistente, primary_key=True, related_name='pago', verbose_name='Asistente', null=False, on_delete=models.PROTECT)
    codigo_pago = models.CharField(max_length=32, verbose_name="Código de recibo", null=False)
    cuenta = models.ForeignKey(Cuenta, null=False, related_name='pagos', verbose_name='Cuenta', on_delete=models.PROTECT)
    foto = models.TextField(verbose_name='Foto', null=False)

    fecha_registro = models.DateTimeField(verbose_name='Fecha de registro', null=False, default=timezone.now)

    fecha = models.DateField(verbose_name='Fecha', null=True)
    hora = models.TimeField(verbose_name='Hora', null=True)
    estado = models.SmallIntegerField(verbose_name='Estado', choices=ESTADOS, default=PENDIENTE_VALIDACION, null=False)

    class Meta:
        unique_together = [['cuenta', 'codigo_pago']]

    def __str__(self):
        return self.codigo_pago
