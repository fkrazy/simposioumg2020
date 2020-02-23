from rest_framework import serializers

from ..models import EstudianteUmg


class EstudianteUmgSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstudianteUmg
        fields = '__all__'
