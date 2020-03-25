from django.contrib.auth.models import User

# Create your views here.
from django.http import Http404
from rest_framework.response import Response
from rest_framework.views import APIView

from administracion.models import Ticket


class GetValidation(APIView):

    def get(self, request, format=None):
        params = request.query_params
        ticket = Ticket.objects.filter(id=params.get('id'))
        user = ticket.asistente.usuario
        if user:
            if user.password == params.get('ticket'):
                if not ticket.asistencias.any(conferencia_id=params.get('conf')):
                    return Response({
                        "message": "correcto",
                        "usuario": {
                            "id": user.id,
                            "nombres": user.first_name,
                            "apellidos": user.last_name,
                            "username": user.username,
                            "correo": user.email
                        }
                    })
                else:
                    return Response({'message': "ticket ya ingresado a conferencia"})
            else:
                return Response({'message': "qr invalido"})
        raise Http404
    #
    # def post(self, request, format=None):
    #     serializer = Serializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)