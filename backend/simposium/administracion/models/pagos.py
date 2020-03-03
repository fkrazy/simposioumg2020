from django.db import models

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

    codigo_pago = models.CharField(max_length=30, verbose_name="Código de recibo", unique=True)
    cuenta = models.ForeignKey(Cuenta, related_name='pagos', verbose_name='Cuenta', on_delete=models.PROTECT)
    foto = models.TextField(verbose_name='Foto', null=False)
    titular = models.OneToOneField(Asistente, related_name='asistente', verbose_name='Asistente', on_delete=models.PROTECT)
    fecha = models.DateField(verbose_name='Fecha')
    hora = models.TimeField(verbose_name='Hora')
    estado = models.SmallIntegerField(verbose_name='Estado', choices=ESTADOS, default=PENDIENTE_VALIDACION)

    def __str__(self):
        return self.codigo_pago
