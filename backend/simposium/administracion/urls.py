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

urlpatterns = [
    path('', include(router.urls)),
]
