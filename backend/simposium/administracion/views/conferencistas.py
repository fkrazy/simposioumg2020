from rest_framework import viewsets

from ..models import Conferencista
from ..serializers import ConferencistaSerializer


class ConferencistaViewSet(viewsets.ModelViewSet):
    serializer_class = ConferencistaSerializer
    queryset = Conferencista.objects.all()
