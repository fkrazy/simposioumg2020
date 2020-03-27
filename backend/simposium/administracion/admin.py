from django.contrib import admin

# Register your models here.
from .models import Pago, Asistencia, Asistente, Carrera, Conferencia, Conferencista, Cuenta, \
    EstudianteUmg, EvaluacionReembolso, Reservacion, Salon, Ticket, ValidacionPago

admin.site.register(Asistencia)
admin.site.register(Asistente)
admin.site.register(Carrera)
admin.site.register(Conferencia)
admin.site.register(Conferencista)
admin.site.register(Cuenta)
admin.site.register(EstudianteUmg)
admin.site.register(EvaluacionReembolso)
admin.site.register(Pago)
admin.site.register(Reservacion)
admin.site.register(Salon)
admin.site.register(Ticket)
admin.site.register(ValidacionPago)
