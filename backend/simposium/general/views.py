from django.db import IntegrityError, DatabaseError, transaction
from django.utils import timezone

from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
    HTTP_204_NO_CONTENT
)
from rest_framework.response import Response
from .authentication import token_expire_handler, expires_in

from .serializers import UserSigninSerializer, UserSerializer, RegistroAsistenteSerializer
from administracion.models import Carrera, Asistente, EstudianteUmg
from administracion.serializers import AsistenteSerializer, EstudianteUmgSerializer

@api_view(["POST"])
@permission_classes((AllowAny,))  # here we specify permission by default we set IsAuthenticated
def signin(request):
    signin_serializer = UserSigninSerializer(data=request.data)
    if not signin_serializer.is_valid():
        return Response(signin_serializer.errors, status=HTTP_400_BAD_REQUEST)

    user = authenticate(
        username=signin_serializer.data['username'],
        password=signin_serializer.data['password']
    )
    if not user:
        return Response({'detail': 'Credenciales invalidas'}, status=HTTP_404_NOT_FOUND)

    # TOKEN STUFF
    token, _ = Token.objects.get_or_create(user=user)

    # token_expire_handler will check, if the token is expired it will generate new one
    is_expired, token = token_expire_handler(token)  # The implementation will be described further
    user_serialized = UserSerializer(user)

    first_login = user.last_login is None # si last_login es null el usuario esta haciendo login por primera vez
    user.last_login = timezone.now() # se establece ahora como el ultimo login
    user.save()

    groups = ''
    for group in user.groups.all():
        groups += ',' + group.name

    payload = {
        'id': user.pk,
        'username': user.username,
        'email': user.email,
        'firstLogin': first_login,
        #'user': user_serialized.data,
        'nombres': user.first_name,
        'apellidos': user.last_name,
        'roles': groups,
        'expires_in': expires_in(token),
        'token': token.key
    }

    try:
        payload['asistente'] = AsistenteSerializer(user.asistente).data
        payload['estudiante'] = EstudianteUmgSerializer(user.Asistente.estudianteUmg).data
    except:
        print('NO ES ASISTENTE O ESTUDIANTE')

    return Response(payload, status=HTTP_200_OK)


@api_view(["POST"])
@permission_classes((AllowAny,))
def registrar(request):
    registro_serializer = RegistroAsistenteSerializer(data=request.data)
    if not registro_serializer.is_valid():
        return Response(registro_serializer.errors, status=HTTP_400_BAD_REQUEST)

    if registro_serializer.data['es_estudiante']:
        if not registro_serializer.data['carnet']:
            return Response({"detail": "Falta el carnet"})
        if not registro_serializer.data['semestre']:
            return Response({"detail": "Falta el semestre"})
        if not registro_serializer.data['codigo_carrera']:
            return Response({"detail": "Falta la carrera"})
        carrera = Carrera.objects.get(pk=registro_serializer.data['codigo_carrera'])
        if carrera is None:
            return Response({"detail": "La carrera no existe"})

    try:
        with transaction.atomic():
            user = User.objects.create_user(username=registro_serializer.data['correo'],
                                            email=registro_serializer.data['correo'],
                                            password=registro_serializer.data['password'])

            user.first_name = registro_serializer.data['nombres']
            user.last_name = registro_serializer.data['apellidos']
            user.groups.add(Group.objects.get(name='ASISTENTE'))
            user.save()

            asistente = Asistente(usuario=user, telefono=registro_serializer.data['telefono'])
            asistente.save()

            if registro_serializer.data['es_estudiante']:
                user.groups.add(Group.objects.get(name='ESTUDIANTE'))
                user.save()
                estudiante = EstudianteUmg(asistente=asistente, semestre=registro_serializer.data['semestre'],
                                           carrera=carrera)
                estudiante.save()
    except (IntegrityError, DatabaseError) as error:
        return Response({"detail": str(error)}, status=HTTP_400_BAD_REQUEST)

    return Response(status=HTTP_204_NO_CONTENT)