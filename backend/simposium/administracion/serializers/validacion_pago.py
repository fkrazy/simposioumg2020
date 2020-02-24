from rest_framework import serializers

from ..models import ValidacionPago


class ValidacionPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ValidacionPago
        fields = '__all__'
