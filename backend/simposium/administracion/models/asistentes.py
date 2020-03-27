from django.db import models
from django.contrib.auth.models import User


class Asistente(models.Model):
    usuario = models.OneToOneField(User, primary_key=True, related_name="asistente", null=False, verbose_name="Usuario",
                                   on_delete=models.CASCADE)
    telefono = models.CharField(max_length=8, null=False)

    def __str__(self):
        return self.usuario.username
