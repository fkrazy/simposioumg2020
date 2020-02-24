from rest_framework import viewsets

from ..models import Salon
from ..serializers import SalonSerializer


class SalonViewSet(viewsets.ModelViewSet):
    serializer_class = SalonSerializer
    queryset = Salon.objects.all()
