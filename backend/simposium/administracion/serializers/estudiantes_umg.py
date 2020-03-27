from rest_framework import serializers

from . import CarreraSerializer, ReadPagoSerializer, ReadAsistenteSerializer
from ..models import EstudianteUmg


class EstudianteUmgSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstudianteUmg
        fields = '__all__'



class ReadEstudianteSerializer(serializers.ModelSerializer):

    carrera = CarreraSerializer()

    class Meta:
        model = EstudianteUmg
        fields = ['carnet', 'semestre', 'carrera']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        try:
            rep['pago'] = ReadPagoSerializer(instance.asistente.pago).data
        except:
            pass
        return rep