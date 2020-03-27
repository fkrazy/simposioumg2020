from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'asistencias', views.AsistenciasViewSet)
router.register(r'asistentes', views.AsistenteViewSet)
router.register(r'carreras', views.CarreraViewSet)
router.register(r'conferencias', views.ConferenciaViewSet)
router.register(r'conferencistas', views.ConferencistaViewSet)
router.register(r'cuentas', views.CuentaViewSet)
router.register(r'estudiantes_umg', views.EstudianteUmgViewSet)
router.register(r'pagos', views.PagoViewSet)
router.register(r'reservaciones', views.ReservacionViewSet)
router.register(r'salones', views.SalonViewSet)
router.register(r'tickets', views.TicketViewSet)
router.register(r'validacion_pagos', views.ValidacionPagoViewSet)
router.register(r'evaluacion_reembolso', views.EvaluacionReembolsoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path(r'validaciones/pago/<int:pago_id>', views.validaciones_de_pago),
    path(r'reembolsos/pago/<int:pago_id>', views.reembolsos_de_pago),
    path(r'evento', views.get_info_evento),
]
