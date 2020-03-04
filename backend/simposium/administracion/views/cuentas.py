from rest_framework import viewsets

from ..models import Cuenta
from ..serializers import CuentaSerializer
from ..permisos.commons import EsAdminOrReadOnly


class CuentaViewSet(viewsets.ModelViewSet):
    serializer_class = CuentaSerializer
    queryset = Cuenta.objects.all()
    permission_classes = [EsAdminOrReadOnly]
