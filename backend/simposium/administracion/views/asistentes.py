from rest_framework import viewsets

from ..models import Asistente
from ..serializers import AsistenteSerializer


class AsistenteViewSet(viewsets.ModelViewSet):
    serializer_class = AsistenteSerializer
    queryset = Asistente.objects.all()
