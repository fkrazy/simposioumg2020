from django.urls import path, include

from . import views

urlpatterns = [
    path(r'pagos', views.reporte_pagos),
    path(r'estudiantes', views.reporte_estudiantes),
    path(r'enviarcorreo', views.enviar_email_reporte)
]
