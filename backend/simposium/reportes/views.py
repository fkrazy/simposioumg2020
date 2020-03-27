from django.core.files.base import ContentFile
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.core.mail import EmailMessage

from email.mime.application import MIMEApplication
from email.encoders import encode_noop

from administracion.models import Pago, EstudianteUmg
from administracion.serializers import ReadPagoSerializer, ReadEstudianteSerializer

from .permisos import PermisoReportes


@api_view(['GET'])
@permission_classes([PermisoReportes])
def reporte_pagos(request):
    return Response(ReadEstudianteSerializer(EstudianteUmg.objects.filter(asistente__pago__isnull=False)
                                             .filter(asistente__pago__estado=Pago.ACEPTADO)
                                             .order_by('asistente__pago__fecha','asistente__pago__hora'), many=True).data,
                    status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([PermisoReportes])
def reporte_estudiantes(request):
    queryset = EstudianteUmg.objects.filter(asistente__pago__isnull=False)\
        .filter(asistente__pago__estado=Pago.ACEPTADO)
    carrera = request.query_params.get('carrera', None)
    semestre = request.query_params.get('semestre', None)
    if carrera:
        queryset = queryset.filter(carrera=carrera)
    if semestre:
        queryset = queryset.filter(semestre=semestre)
    return Response(ReadEstudianteSerializer(queryset.order_by('asistente__pago__fecha', 'asistente__pago__hora'),
                                             many=True).data,
                    status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([PermisoReportes])
def enviar_email_reporte(request):
    email = EmailMessage(
        request.data['subject'],
        request.data['mensaje'],
        'deswebumg@gmail.com',
        [request.data['destination']],
        attachments=[
            (request.data['filename'], b64_to_pdf(request.data['pdf'][len('data:application/pdf;filename=generated.pdf;base64,'):]), 'application/pdf')
        ]
    )
    email.send()
    return Response(status=status.HTTP_204_NO_CONTENT)


def b64_to_pdf(b64content):
    import io as BytesIO
    import base64

    buffer = BytesIO.BytesIO()
    content = base64.b64decode(b64content)
    buffer.write(content)

    return buffer.getvalue()