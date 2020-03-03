from django.db import models
from .carreras import Carrera
from .asistentes import Asistente


class EstudianteUmg(models.Model):
    asistente = models.OneToOneField(Asistente, related_name="EstudianteUmg", verbose_name="Asistente", on_delete=models.CASCADE)
    carnet = models.CharField(max_length=25, null=False, unique=True)
    semestre = models.PositiveSmallIntegerField(null=False, verbose_name='Semestre')
    carrera = models.ForeignKey(Carrera, related_name="estudiantes", verbose_name="Carrera", on_delete=models.PROTECT)