from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'asistencias', views.AsistenciasViewSet)
router.register(r'asistentes', views.AsistenteViewSet)
router.register(r'carreras', views.CarreraViewSet)
router.register(r'conferencias', views.ConferenciaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
