from django.db import models


class Conferencista(models.Model):
    nombre = models.CharField(max_length=120, null=False)
    profesion = models.CharField(max_length=150, null=False)
    resumen = models.CharField(max_length=300)
