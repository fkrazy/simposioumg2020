from django.db import models
from .tickets import Ticket
from .conferencias import Conferencia


class Asistencia(models.Model):

    ticket = models.ForeignKey(Ticket, related_name="asistencias", null=False, verbose_name="Ticket", on_delete=models.PROTECT)
    conferencia = models.ForeignKey(Conferencia, related_name="asistencias", null=False, verbose_name="Conferencia", on_delete=models.PROTECT)
    hora = models.TimeField(null=False, verbose_name='Hora de asistencia')

    class Meta:
        unique_together = [['conferencia', 'ticket']]


    def __str__(self):
        return self.conferencia.tema + ' ' + str(self.hora)