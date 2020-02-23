from rest_framework import serializers

from ..models import Reservacion


class ReservacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservacion
        fields = '__all__'
