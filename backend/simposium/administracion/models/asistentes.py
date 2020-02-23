from django.db import models
from django.contrib.auth.models import User


class Asistente(models.Model):
    usuario = models.ForeignKey(User, related_name="Asistente", verbose_name="Usuario", on_delete=models.CASCADE)
    telefono = models.CharField(max_length=20, null=False)
    first_login = models.BooleanField()
