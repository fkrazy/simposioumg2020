from django.contrib.auth.models import User
from django.db import models
from datetime import datetime

from .pagos import Pago


class EvaluacionReembolso(models.Model):
    # esta tabla contiene los resultados de evaluaciones de reembolso de pago realizadas por administradores
    # por ejemplo si se rechazó el reembolso, se puede escribir un mensaje del por qué

    RECHAZADO = 1
    ACEPTADO = 2
    REEMBOLSADO = 3

    RESULTADOS = (
        (RECHAZADO, 'Rechazado'),
        (ACEPTADO, 'Aceptado'),
        (REEMBOLSADO, 'Reembolsado')
    )

    mensaje = models.CharField(max_length=256, verbose_name="Mensaje", null=True)
    resultado = models.PositiveSmallIntegerField(verbose_name='Resultado', choices=RESULTADOS, default=ACEPTADO,
                                                 null=False)

    # relaciones
    pago = models.ForeignKey(Pago, related_name='evaluaciones_reembolso', verbose_name='Pago', null=False,
                             on_delete=models.PROTECT)
    usuario = models.ForeignKey(User, related_name='evaluaciones_reembolsos', verbose_name='Usuario que evaluó', null=False,
                                on_delete=models.PROTECT)

    fecha_hora = models.DateTimeField(null=False, verbose_name='Fecha y hora de evaluación', default=datetime.utcnow)

    def __str__(self):
        return f'{str(self.pago)} - {self.usuario}'