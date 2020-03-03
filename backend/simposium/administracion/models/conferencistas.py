from django.db import models


class Conferencista(models.Model):
    nombre = models.CharField(max_length=64, null=False)
    profesion = models.CharField(max_length=128, null=False)
    resumen = models.CharField(max_length=256, null=False, default='')

    def __str__(self):
        return self.nombre