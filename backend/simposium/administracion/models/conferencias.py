from django.db import models
from .conferencistas import Conferencista
from .salones import Salon


class Conferencia(models.Model):
    tema = models.CharField(max_length=128, null=False, unique=True)
    inicio = models.TimeField(null=False, verbose_name='Hora de inicio')
    fin = models.TimeField(null=False, verbose_name='Hora de finalización')
    conferencista = models.ForeignKey(Conferencista, related_name='conferencias', null=False, on_delete=models.PROTECT)
    salon = models.ForeignKey(Salon, related_name='conferencias', null=False, on_delete=models.CASCADE)

    def __str__(self):
        return self.tema