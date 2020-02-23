from rest_framework import serializers

from ..models import Conferencista


class ConferencistaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conferencista
        fields = '__all__'
