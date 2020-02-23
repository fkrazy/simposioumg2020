from rest_framework import viewsets

from ..models import Cuenta
from ..serializers import CuentaSerializer


class CuentaViewSet(viewsets.ModelViewSet):
    serializer_class = CuentaSerializer
    queryset = Cuenta.objects.all()
