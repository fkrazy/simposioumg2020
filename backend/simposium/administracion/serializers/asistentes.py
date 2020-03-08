from rest_framework import serializers

from ..models import Asistente
from ..serializers.usuarios import ReadUserSerializer


class AsistenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asistente
        fields = '__all__'


class ReadAsistenteSerializer(serializers.ModelSerializer):

    usuario = ReadUserSerializer()

    class Meta:
        model = Asistente
        fields = ['usuario', 'telefono']
        read_only_fields = ['usuario', 'telefono']