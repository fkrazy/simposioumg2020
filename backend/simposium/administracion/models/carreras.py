from django.db import models


class Carrera(models.Model):
    codigo = models.PositiveIntegerField(null=False, unique=True, primary_key=True)
    nombre = models.CharField(max_length=128, null=False, unique=True)

    def __str__(self):
        return self.nombre
