from django.db import models


class Salon(models.Model):
    nombre = models.CharField(max_length=64, null=False, unique=True)
    ubicacion = models.CharField(max_length=128, null=False)
    capacidad = models.SmallIntegerField(null=False)

    def __str__(self):
        return self.nombre
