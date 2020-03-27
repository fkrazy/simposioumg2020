from django.db import models
from .carreras import Carrera
from .asistentes import Asistente


class EstudianteUmg(models.Model):
    asistente = models.OneToOneField(Asistente, primary_key=True, related_name="estudianteUmg", verbose_name="Asistente", on_delete=models.CASCADE)
    carnet = models.CharField(max_length=32, null=False, unique=True)
    semestre = models.PositiveSmallIntegerField(null=False, verbose_name='Semestre')
    carrera = models.ForeignKey(Carrera, null=False, related_name="estudiantes", verbose_name="Carrera", on_delete=models.PROTECT)

    def __str__(self):
        return self.carnet