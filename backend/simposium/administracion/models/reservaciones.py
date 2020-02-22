from django.db import models
from django.contrib.auth.models import User
from .conferencias import Conferencia

class Reservacion(models.Model):

    PAGADA = 1
    NO_PAGADA = 2

    ESTADOS = (
        (PAGADA, "PAGADA"),
        (NO_PAGADA, "NO PAGADA")
    )

    usuario = models.ForeignKey(User, related_name='Reservacion', verbose_name='Usuario', on_delete=models.CASCADE)
    conferencia = models.ForeignKey(Conferencia, related_name="Reservacion", verbose_name="Conferencia", on_delete=models.CASCADE)
    hora = models.TimeField(null=False)
    estado = models.SmallIntegerField(verbose_name="ESTOS", choices=ESTADOS, default=NO_PAGADA)