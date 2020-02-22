from django.db import models
from django.contrib.auth.models import User

class Ticket(models.Model):

    VENDIDO = 1
    NO_VENDIDO = 2

    ESTADO = (
        (VENDIDO, "VENDIDO"),
        (NO_VENDIDO, "NO VENDIDO")
    )

    usuario = models.ForeignKey(User, related_name="Ticket", verbose_name="Usuarios", on_delete=models.CASCADE)
    codigo_qr = models.CharField(max_length=200, null=False)
    estado = models.SmallIntegerField(verbose_name="ESTADOS", choices=ESTADO, default=NO_VENDIDO)