from django.contrib.auth.models import User
from rest_framework import serializers


class UserSigninSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


class RegistroAsistenteSerializer(serializers.Serializer):
    nombres = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    apellidos = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    correo = serializers.EmailField(required=True, allow_null=False, allow_blank=False)
    telefono = serializers.CharField(max_length=8, required=True, allow_null=False, allow_blank=False)
    password = serializers.CharField(max_length=128, required=True, allow_null=False, allow_blank=False)
    es_estudiante = serializers.BooleanField(required=True, allow_null=False)
    carnet = serializers.CharField(max_length=32, required=False)
    semestre = serializers.IntegerField(required=False)
    codigo_carrera = serializers.IntegerField(required=False)