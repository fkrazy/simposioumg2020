from django.db.models import ProtectedError
from rest_framework import viewsets, status
from rest_framework.response import Response

from ..models import Cuenta
from ..serializers import CuentaSerializer
from ..permisos.commons import EsAdminOrReadOnly


class CuentaViewSet(viewsets.ModelViewSet):
    serializer_class = CuentaSerializer
    queryset = Cuenta.objects.all()
    permission_classes = [EsAdminOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, args, kwargs)
        except ProtectedError:
            return Response({"detail": 'Otros registros referencian a esta cuenta'}, status=status.HTTP_400_BAD_REQUEST )
