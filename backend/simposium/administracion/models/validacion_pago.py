from django.contrib.auth.models import User
from django.db import models
from datetime import datetime

from .pagos import Pago

class ValidacionPago(models.Model):
    # esta tabla contiene los resultados de validaciones de pagos realizadas por administradores
    # por ejemplo si se rechazó el pago, se puede escribir un mensaje del por qué

    RECHAZADO = 1
    ACEPTADO = 2

    RESULTADOS = (
        (RECHAZADO, 'Rechazado'),
        (ACEPTADO, 'Aceptado'),
    )

    mensaje = models.CharField(max_length=256, verbose_name="Mensaje", null=True)
    resultado = models.PositiveSmallIntegerField(verbose_name='Resultado', choices=RESULTADOS, default=ACEPTADO, null=False)

    # relaciones
    pago = models.ForeignKey(Pago, related_name='validaciones', verbose_name='Pago', null=False, on_delete=models.CASCADE)
    usuario = models.ForeignKey(User, related_name='validaciones_pagos', verbose_name='Usuario que validó', null=False, on_delete=models.PROTECT)

    fecha_hora = models.DateTimeField(null=False, verbose_name='Fecha y hora de validación', default=datetime.utcnow)

    def __str__(self):
        return f'{str(self.pago)} - {self.usuario}'
