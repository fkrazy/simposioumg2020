from rest_framework import viewsets

from ..models import Carrera
from ..serializers import CarreraSerializer

from ..permisos import EsAdminOrReadOnly

class CarreraViewSet(viewsets.ModelViewSet):
    serializer_class = CarreraSerializer
    queryset = Carrera.objects.all()
    permission_classes = [EsAdminOrReadOnly]
