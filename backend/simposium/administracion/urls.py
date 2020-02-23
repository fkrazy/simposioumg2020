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
router.register(r'reseraciones', views.ReservacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
