from django.db import models
from .conferencistas import Conferencista
from .salones import Salon

class Conferencia(models.Model):
    #id_conferencia = models.IntegerField(primary_key=True, null=False)
    tema = models.CharField(max_length=100, null=False)
    inicio = models.DateTimeField(null=False)
    fin = models.DateTimeField(null=False)
    conferencista = models.ForeignKey(Conferencista, on_delete=models.CASCADE)
    salon = models.ForeignKey(Salon, on_delete=models.CASCADE)