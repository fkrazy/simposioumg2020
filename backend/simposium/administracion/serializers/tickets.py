from rest_framework import serializers

from . import ReadAsistenteSerializer
from ..models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    asistente = ReadAsistenteSerializer()

    class Meta:
        model = Ticket
        fields = '__all__'
        read_only_fields = ['asistente', 'codigo_qr', 'estado']
