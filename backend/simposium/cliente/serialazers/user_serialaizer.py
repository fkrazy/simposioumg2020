from rest_framework import serializers
from django.contrib.auth.models import User

class UsersSerialiazers(serializers.Serializer):
    id = serializers.ReadOnlyField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()

    def create(self, validate_data):
        usuario = User()
        usuario.first_name = validate_data.get('first_name')
        usuario.last_name = validate_data.get('last_name')
        usuario.email = validate_data.get('email')
        usuario.set_password(validate_data.get('password'))
        usuario.save()
        return usuario

    def validar_username(self, data):
        users = User.objects.filter(username = data)
        if(len(users) != 0):
            raise serializers.ValidationError("Este nombre de usuario ya está en uso...")
        else:
            return users