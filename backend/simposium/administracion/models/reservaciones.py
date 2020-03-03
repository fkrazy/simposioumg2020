from django.db import models

from .asistentes import Asistente
from .conferencias import Conferencia


class Reservacion(models.Model):

    PAGADA = 1
    NO_PAGADA = 2

    ESTADOS = (
        (PAGADA, "PAGADA"),
        (NO_PAGADA, "NO PAGADA")
    )

    asistente = models.ForeignKey(Asistente, null=False, related_name='reservaciones', verbose_name='Asistente',
                                  on_delete=models.CASCADE)
    conferencia = models.ForeignKey(Conferencia, null=False, related_name="reservaciones", verbose_name="Conferencia",
                                    on_delete=models.CASCADE)
    fecha = models.DateTimeField(verbose_name='Fecha de reservación', null=False)
    estado = models.SmallIntegerField(verbose_name="Estado", choices=ESTADOS, default=NO_PAGADA, null=False)

    class Meta:
        index_together = [
            ["conferencia", "asistente"],
        ]

    def __str__(self):
        return self.conferencia.tema + ' - ' + str(self.fecha)