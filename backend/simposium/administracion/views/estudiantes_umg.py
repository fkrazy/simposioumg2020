from rest_framework import viewsets

from ..models import EstudianteUmg
from ..serializers import EstudianteUmgSerializer


class EstudianteUmgViewSet(viewsets.ModelViewSet):
    serializer_class = EstudianteUmgSerializer
    queryset = EstudianteUmg.objects.all()
