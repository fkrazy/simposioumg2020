from django.db import models
from django.contrib.auth.models import User
from .carreras import Carrera


class EstudianteUmg(models.Model):
    usuario = models.ForeignKey(User, related_name="EstudianteUmg", verbose_name="Usuario", on_delete=models.CASCADE)
    carnet = models.CharField(max_length=25, null=False)
    semestre = models.SmallIntegerField(null=False)
    codigo_carrera = models.ForeignKey(Carrera, related_name="EstudianteUmg", verbose_name="Carrera", on_delete=models.CASCADE)