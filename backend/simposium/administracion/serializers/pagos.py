from rest_framework import serializers
from datetime import datetime

from pytz import timezone

from ..models import Pago
from . import CuentaSerializer
from .asistentes import ReadAsistenteSerializer

guatemala = timezone('America/Guatemala')


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
        rep["fecha_registro"] = datetime.strftime(instance.fecha_registro.astimezone(guatemala), "%d/%m/%Y %H:%M:%S")
        if instance.fecha:
            rep["fecha"] = datetime.strftime(instance.fecha, "%d/%m/%Y")
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

        try:
            data["fecha"] = datetime.strftime(datetime.strptime(data["fecha"], "%d/%m/%Y"), "%Y-%m-%d")
        except ValueError:
            pass
        return super().to_internal_value(data)


    class Meta:
        model = Pago
        fields = '__all__'
