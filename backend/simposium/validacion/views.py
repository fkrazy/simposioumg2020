
from django.contrib.auth.models import User

# Create your views here.
from django.http import Http404
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.views import APIView

from administracion.models import Ticket

from administracion.models import Asistencia


class GetValidation(APIView):

    def get(self, request, format=None):
        params = request.query_params
        ticket = Ticket.objects.filter(asistente_id=params.get('id')).first()
        user = ticket.asistente.usuario
        if user:
            if user.password.replace('+', ' ') == params.get('ticket'):
                if not ticket.asistencias.filter(conferencia_id=params.get('conf')).exists():
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

    def post(self, request, format=None):
        params = request.data
        ticket = Ticket.objects.filter(asistente_id=params.get('id')).first()
        user = ticket.asistente.usuario
        conferencia = params.get('id_conferencia')
        if user:
            if user.password == params.get('password'):
                if not ticket.asistencias.filter(conferencia_id=conferencia).exists():
                    Asistencia.objects.create(conferencia_id=conferencia, ticket=ticket, hora=timezone.now().time())
                    return Response({'message': 'correcto'})
                else:
                    return Response({'message': "ticket ya ingresado a conferencia"})
            else:
                return Response({'message': "qr invalido"})
        raise Http404
