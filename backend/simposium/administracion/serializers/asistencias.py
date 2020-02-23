from rest_framework import serializers

from ..models import Asistencia


class AsistenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asistencia
        fields = '__all__'
