from django.db import models

class Conferencista(models.Model):

    #id_conferencista = models.SmallIntegerField(primary_key=True, null=False)
    nombre = models.CharField(max_length=120, null=False)
    profesion = models.CharField(max_length=150, null=False)
    resumen = models.CharField(max_length=300)