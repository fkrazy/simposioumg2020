from django.db import models


class Carrera(models.Model):
    codigo = models.PositiveIntegerField(null=False, unique=True)
    nombre = models.CharField(max_length=100, null=False, unique=True)

    def __str__(self):
        return self.nombre
