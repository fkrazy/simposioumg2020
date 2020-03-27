from django.db.models import ProtectedError
from rest_framework import viewsets, status
from rest_framework.response import Response

from ..models import Conferencista
from ..serializers import ConferencistaSerializer
from ..permisos.commons import EsAdminOrReadOnly


class ConferencistaViewSet(viewsets.ModelViewSet):
    serializer_class = ConferencistaSerializer
    queryset = Conferencista.objects.all()
    permission_classes = [EsAdminOrReadOnly]

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, args, kwargs)
        except ProtectedError:
            return Response({"detail": 'Otros registros referencian a este conferencista'}, status=status.HTTP_400_BAD_REQUEST )
