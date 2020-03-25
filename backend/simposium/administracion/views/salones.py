from django.db.models import ProtectedError
from rest_framework import viewsets, status
from rest_framework.response import Response

from ..models import Salon
from ..serializers import SalonSerializer
from ..permisos.commons import EsAdminOrReadOnly


class SalonViewSet(viewsets.ModelViewSet):
    serializer_class = SalonSerializer
    queryset = Salon.objects.all()
    permission_classes = [EsAdminOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, args, kwargs)
        except ProtectedError:
            return Response({"detail": 'Otros registros referencian a este salon'}, status=status.HTTP_400_BAD_REQUEST )
