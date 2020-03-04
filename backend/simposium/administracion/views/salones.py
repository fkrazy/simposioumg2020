from rest_framework import viewsets

from ..models import Salon
from ..serializers import SalonSerializer
from ..permisos.commons import EsAdminOrReadOnly


class SalonViewSet(viewsets.ModelViewSet):
    serializer_class = SalonSerializer
    queryset = Salon.objects.all()
    permission_classes = [EsAdminOrReadOnly]
