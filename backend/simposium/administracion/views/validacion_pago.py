from rest_framework import viewsets

from ..models import ValidacionPago
from ..serializers import ValidacionPagoSerializer
from ..permisos import PermisoValidacionesPago


class ValidacionPagoViewSet(viewsets.ModelViewSet):
    serializer_class = ValidacionPagoSerializer
    queryset = ValidacionPago.objects.all()
    permission_classes = [PermisoValidacionesPago]