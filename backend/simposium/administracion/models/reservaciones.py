from django.db import models

from .asistentes import Asistente
from .conferencias import Conferencia


class Reservacion(models.Model):

    CONFIRMADA = 1
    PAGO_POR_VALIDAR = 2 # significa que el asistente ya registro su pago y esta pendiente de validar

    ESTADOS = (
        (CONFIRMADA, "Confirmada"),
        (PAGO_POR_VALIDAR, "Pago pendiente de validar"),
    )

    asistente = models.ForeignKey(Asistente, null=False, related_name='reservaciones', verbose_name='Asistente',
                                  on_delete=models.CASCADE)
    conferencia = models.ForeignKey(Conferencia, null=False, related_name="reservaciones", verbose_name="Conferencia",
                                    on_delete=models.PROTECT)
    fecha = models.DateTimeField(verbose_name='Fecha de reservación', null=False)
    estado = models.SmallIntegerField(verbose_name="Estado", choices=ESTADOS, default=CONFIRMADA, null=False)

    class Meta:
        unique_together = [
            ["conferencia", "asistente"],
        ]

    def __str__(self):
        return self.conferencia.tema + ' - ' + str(self.fecha)