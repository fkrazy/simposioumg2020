from rest_framework import serializers
from django.db.models import Sum, Count
from ..models import Cuenta, Pago


class CuentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuenta
        fields = '__all__'

    def to_representation(self, instance):
        rep = super().to_representation(instance)

        rep["numero_depositos"] = Pago.objects.filter(cuenta=instance).filter(estado=Pago.ACEPTADO).count()
        return rep
