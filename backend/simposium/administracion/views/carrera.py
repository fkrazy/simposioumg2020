from rest_framework import viewsets

from ..models import Carrera
from ..serializers import CarreraSerializer


class CarreraViewSet(viewsets.ModelViewSet):
    serializer_class = CarreraSerializer
    queryset = Carrera.objects.all()
