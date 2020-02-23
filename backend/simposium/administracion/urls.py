from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'', views.AsistenciasViewSet)
router.register(r'', views.AsistenteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
