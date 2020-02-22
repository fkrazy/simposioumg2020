from django.db import models

class Salon(models.Model):
    #id_salon = models.IntegerField(primary_key=True, null=False)
    nombre = models.CharField(max_length=50, null=False)
    ubicacion = models.CharField(max_length=100, null=False)
    capacidad = models.SmallIntegerField(null=False)