from rest_framework import viewsets

from ..models import Reservacion
from ..serializers import ReservacionSerializer


class ReservacionViewSet(viewsets.ModelViewSet):
    serializer_class = ReservacionSerializer
    queryset = Reservacion.objects.all()
