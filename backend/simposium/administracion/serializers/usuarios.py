from django.contrib.auth.models import User
from rest_framework import serializers


class ReadUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id', 'username', 'email', 'first_name', 'last_name']

    def to_representation(self, instance):
        roles = ''
        for group in instance.groups.all():
            roles += group.name
        return {
            'id': instance.id,
            'username': instance.username,
            'correo': instance.email,
            'nombres': instance.first_name,
            'apellidos': instance.last_name,
            'roles': roles
        }