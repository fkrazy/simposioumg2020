from rest_framework import viewsets

from ..models import EvaluacionReembolso
from ..serializers import EvaluacionReembolsoSerializer


class EvaluacionReembolsoViewSet(viewsets.ModelViewSet):
    serializer_class = EvaluacionReembolsoSerializer
    queryset = EvaluacionReembolso.objects.all()
