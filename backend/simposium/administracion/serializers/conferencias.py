from rest_framework import serializers

from ..models import Conferencia
from .conferencistas import ConferencistaSerializer
from .salones import SalonSerializer


class ConferenciaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conferencia
        fields = '__all__'


class ReadConferenciaSerializer(serializers.ModelSerializer):

    conferencista = ConferencistaSerializer()
    salon = SalonSerializer()

    class Meta:
        model = Conferencia
        fields = '__all__'
        read_only_fields = ['id', 'tema', 'inicio', 'fin', 'conferencista', 'salon', 'foto']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["id_conferencista"] = rep["conferencista"]["id"]
        rep["id_salon"] = rep["salon"]["id"]
        return rep


