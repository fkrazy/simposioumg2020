from datetime import datetime

from rest_framework import serializers
from pytz import timezone

from ..models import ValidacionPago

guatemala = timezone('America/Guatemala')


class ValidacionPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ValidacionPago
        fields = '__all__'

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["fecha_hora"] = datetime.strftime(instance.fecha_hora.astimezone(guatemala), "%d/%m/%Y %H:%M:%S")
        return rep
