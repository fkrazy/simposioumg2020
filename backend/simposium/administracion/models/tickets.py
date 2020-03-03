from django.db import models

from .asistentes import Asistente


class Ticket(models.Model):

    VALIDO = 1
    INVALIDO = 2

    ESTADOS = (
        (VALIDO, "VALIDO"),
        (INVALIDO, "INVALIDADO")
    )

    asistente = models.OneToOneField(Asistente, primary_key=True, related_name="ticket", verbose_name="Usuario", on_delete=models.CASCADE)
    codigo_qr = models.CharField(max_length=256, null=False)
    estado = models.PositiveSmallIntegerField(verbose_name="Estados", choices=ESTADOS, default=VALIDO, null=False)
