from django.shortcuts import render
from datetime import datetime

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK,
)
from rest_framework.response import Response

from .serializers import UserSigninSerializer, UserSerializer
from administracion.serializers import AsistenteSerializer, EstudianteUmgSerializer
from .authentication import token_expire_handler, expires_in


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
    user.last_login = datetime.utcnow() # se establece ahora como el ultimo login
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