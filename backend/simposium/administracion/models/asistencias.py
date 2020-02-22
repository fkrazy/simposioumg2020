from django.db import models
from .tickets import Ticket
from .conferencias import Conferencia
from django.contrib.auth.models import User

class Asistencia(models.Model):
    ticket = models.ForeignKey(Ticket, related_name="Asistencia",verbose_name="Ticket", on_delete=models.CASCADE)
    conferencia = models.ForeignKey(Conferencia, related_name="Asistencia", verbose_name="Conferencia", on_delete=models.CASCADE)
    hora = models.TimeField()