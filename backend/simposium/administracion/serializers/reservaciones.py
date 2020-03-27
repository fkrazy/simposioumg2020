from rest_framework import serializers

from ..models import Reservacion
from ..serializers import ReadAsistenteSerializer, ReadConferenciaSerializer


class ReservacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservacion
        fields = '__all__'


class ReadReservacionSerializer(serializers.ModelSerializer):

    asistente = ReadAsistenteSerializer()
    conferencia = ReadConferenciaSerializer()

    class Meta:
        model = Reservacion
        fields = '__all__'
        read_only_fields = ['id', 'asistente', 'conferencia', 'fecha', 'estado']