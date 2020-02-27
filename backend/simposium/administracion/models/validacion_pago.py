from django.contrib.auth.models import User
from django.db import models
from datetime import datetime

from .pagos import Pago


class ValidacionPago(models.Model):
    # esta tabla contiene los resultados de validaciones de pagos realizadas por administradores
    # por ejemplo si se rechazó el pago, se puede escribir un mensaje del por qué

    VALIDACION_RECHAZADA = 2
    ACEPTADO = 3
    REEMBOLSO_APROBADO = 5
    REEMBOLSADO = 6

    resultados = (
        (VALIDACION_RECHAZADA, 'Rechazado'),
        (ACEPTADO, 'Aceptado'),
        (REEMBOLSO_APROBADO, 'Reembolso aprobado'),
        (REEMBOLSADO, 'Reembolsado')
    )

    mensaje = models.CharField(max_length=300, verbose_name="Mensaje")
    resultado = models.SmallIntegerField(verbose_name='Resultado', choices=resultados, null=False)

    # relaciones
    pago = models.ForeignKey(Pago, related_name='Validaciones', verbose_name='Pago', on_delete=models.PROTECT)
    usuario = models.ForeignKey(User, related_name='Validaciones', verbose_name='Usuario', on_delete=models.PROTECT)

    time_validacion = models.DateTimeField(null=False, default=datetime.now)

    def __str__(self):
        return f'{self.pago} - {self.usuario}'
