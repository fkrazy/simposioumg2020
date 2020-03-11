from rest_framework import viewsets, permissions
from rest_framework.permissions import SAFE_METHODS

from ..models import Conferencia
from ..serializers import ConferenciaSerializer, ReadConferenciaSerializer
from ..permisos.commons import EsAdminOrReadOnly


class ConferenciaViewSet(viewsets.ModelViewSet):
    serializer_class = ConferenciaSerializer
    queryset = Conferencia.objects.all()
    permission_classes = [EsAdminOrReadOnly]

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return ReadConferenciaSerializer
        return ConferenciaSerializer
