from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone as tz
from pytz import timezone
from datetime import datetime, time

guatemala_tz = timezone('America/Guatemala')

fecha_evento = guatemala_tz.localize(datetime.strptime("10/05/2020 00:00:00","%d/%m/%Y %H:%M:%S"))
lugar_evento = "Campus UMG"
costo = 300

@api_view(['GET'])
@permission_classes([AllowAny])
def get_info_evento(request):
    fecha_actual = tz.now().astimezone(guatemala_tz)

    return Response({
        "fecha": datetime.strftime(fecha_evento, "%d/%m/%Y"),
        "lugar": lugar_evento,
        "costo": costo,
        "dias_que_faltan": (fecha_evento - fecha_actual).days
    }, status=status.HTTP_200_OK)
