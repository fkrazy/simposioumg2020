from rest_framework import viewsets

from ..models import Pago
from ..serializers import PagoSerializer


class PagoViewSet(viewsets.ModelViewSet):
    serializer_class = PagoSerializer
    queryset = Pago.objects.all()
