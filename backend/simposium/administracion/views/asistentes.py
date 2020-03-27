from rest_framework import viewsets
from rest_framework.response import Response

from ..models import Asistente
from ..serializers import AsistenteSerializer


class AsistenteViewSet(viewsets.ModelViewSet):
    serializer_class = AsistenteSerializer
    queryset = Asistente.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        return Response({
            "usuario": {
                "id": instance.usuario.id,
                "nombres": instance.usuario.first_name,
                "apellidos": instance.usuario.last_name,
                "username": instance.usuario.username,
                "correo": instance.usuario.email
            },
            "telefono": instance.telefono
        })
