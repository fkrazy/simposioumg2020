from rest_framework import viewsets

from ..models import Conferencista
from ..serializers import ConferencistaSerializer
from ..permisos.commons import EsAdminOrReadOnly


class ConferencistaViewSet(viewsets.ModelViewSet):
    serializer_class = ConferencistaSerializer
    queryset = Conferencista.objects.all()
    permission_classes = [EsAdminOrReadOnly]
