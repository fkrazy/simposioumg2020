from rest_framework import serializers

from ..models import Pago
from . import CuentaSerializer
from .asistentes import ReadAsistenteSerializer


class ReadPagoSerializer(serializers.ModelSerializer):
    cuenta = CuentaSerializer()
    titular = ReadAsistenteSerializer()

    class Meta:
        model = Pago
        fields = '__all__'
        read_only_fields = ['titular', 'codigo_pago', 'cuenta', 'foto', 'fecha_registro', 'fecha', 'hora', 'estado']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["cuenta_id"] = rep["cuenta"]["id"]
        rep["titular_id"] = rep["titular"]["usuario"]["id"]
        return rep


class CreatePagoSerializer(serializers.ModelSerializer):

    fecha = serializers.DateField(required=False)
    hora = serializers.TimeField(required=False)

    def to_internal_value(self, data):
        try:
            data["cuenta"] = data["cuenta_id"]
            data["titular"] = data["titular_id"]
        except KeyError:
            pass
        return super().to_internal_value(data)


    class Meta:
        model = Pago
        fields = '__all__'
