from rest_framework import serializers

from ..models import EvaluacionReembolso


class EvaluacionReembolsoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluacionReembolso
        fields = '__all__'
