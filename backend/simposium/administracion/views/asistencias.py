from rest_framework import viewsets

from ..models import Asistencia
from ..serializers import AsistenciaSerializer


class AsistenciasViewSet(viewsets.ModelViewSet):
    serializer_class = AsistenciaSerializer
    queryset = Asistencia.objects.all()
