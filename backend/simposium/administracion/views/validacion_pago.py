from rest_framework import viewsets

from ..models import ValidacionPago
from ..serializers import ValidacionPagoSerializer


class ValidacionPagoViewSet(viewsets.ModelViewSet):
    serializer_class = ValidacionPagoSerializer
    queryset = ValidacionPago.objects.all()
