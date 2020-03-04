from rest_framework import viewsets, permissions
from ..models import Conferencia
from ..serializers import ConferenciaSerializer
from administracion.permisos.conferencias import PermisoConferencias


class ConferenciaViewSet(viewsets.ModelViewSet):
    serializer_class = ConferenciaSerializer
    queryset = Conferencia.objects.all()
    permission_classes = [PermisoConferencias]
