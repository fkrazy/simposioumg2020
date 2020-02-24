from rest_framework import serializers

from ..models import Asistente


class AsistenteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asistente
        fields = '__all__'
