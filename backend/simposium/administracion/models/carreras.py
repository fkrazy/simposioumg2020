from django.db import models


class Carrera(models.Model):
    nombre = models.CharField(max_length=100, null=False, unique=True)

    def __str__(self):
        return self.nombre
