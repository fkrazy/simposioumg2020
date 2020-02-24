from rest_framework import viewsets

from ..models import Conferencia
from ..serializers import ConferenciaSerializer


class ConferenciaViewSet(viewsets.ModelViewSet):
    serializer_class = ConferenciaSerializer
    queryset = Conferencia.objects.all()
