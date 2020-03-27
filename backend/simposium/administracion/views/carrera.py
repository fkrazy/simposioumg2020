from django.db.models import ProtectedError
from rest_framework import viewsets, status
from rest_framework.response import Response

from ..models import Carrera
from ..serializers import CarreraSerializer

from ..permisos import EsAdminOrReadOnly

class CustomModelViewSet(viewsets.ModelViewSet):

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, args, kwargs)
        except ProtectedError as err:
            return Response({"detail": str(err)}, status=status.HTTP_400_BAD_REQUEST )


class CarreraViewSet(viewsets.ModelViewSet):
    serializer_class = CarreraSerializer
    queryset = Carrera.objects.all()
    permission_classes = [EsAdminOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, args, kwargs)
        except ProtectedError:
            return Response({"detail": 'Otros registros referencian a esta carrera'}, status=status.HTTP_400_BAD_REQUEST )