from django.db import models


class Salon(models.Model):
    nombre = models.CharField(max_length=50, null=False)
    ubicacion = models.CharField(max_length=100, null=False)
    capacidad = models.SmallIntegerField(null=False)
