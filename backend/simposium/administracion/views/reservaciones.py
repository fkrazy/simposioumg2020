from django.db.models import ProtectedError, Q
from rest_framework import viewsets, status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import SAFE_METHODS
from rest_framework.response import Response

from django.utils import timezone

from ..models import Reservacion, Pago, Conferencia, ValidacionPago
from ..permisos import PermisoReservaciones
from ..serializers import ReservacionSerializer, ReadReservacionSerializer


class ReservacionViewSet(viewsets.ModelViewSet):
    serializer_class = ReservacionSerializer
    queryset = Reservacion.objects.all()
    permission_classes = [PermisoReservaciones]

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return ReadReservacionSerializer
        return ReservacionSerializer

    def filter_queryset(self, queryset):
        for g in self.request.user.groups.all():
            if g.name == 'ASISTENTE':
                return queryset.filter(asistente=self.request.user.asistente)
        return queryset

    def create(self, request, *args, **kwargs):

        request.data['asistente'] = request.user.id;
        request.data['fecha'] = str(timezone.now())
        request.data['estado'] = Reservacion.PAGO_POR_VALIDAR

        serializer = self.get_serializer(data=request.data)

        try:
            pago = request.user.asistente.pago
            if pago.estado == Pago.ACEPTADO:
                serializer.estado = Reservacion.CONFIRMADA
            elif pago.estado == Pago.PENDIENTE_VALIDACION:
                if not pago.validaciones.filter(resultado=ValidacionPago.RECHAZADO).exists():
                    serializer.estado = Reservacion.PAGO_POR_VALIDAR
                else:
                    return Response({"detail": "No puedes hacer reservaciones, tu pago ya fue rechazado una vez"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"detail": "No puedes hacer reservaciones por el estado actual de tu pago"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"detail": "No puedes hacer reservaciones, primero debes registrar tu pago"}, status=status.HTTP_400_BAD_REQUEST)
        serializer.is_valid(raise_exception=True)
        conf = Conferencia.objects.get(pk=serializer.validated_data['conferencia'].id)
        if (conf.salon.capacidad - len(Reservacion.objects.filter(conferencia=conf).all())) <= 0:
            return Response({"detail": "Ya no hay cupo para esta conferencia"}, status=status.HTTP_400_BAD_REQUEST)

        if Reservacion.objects.filter(asistente=request.user.asistente)\
            .filter(Q(conferencia__inicio__gte=conf.inicio) & Q(conferencia__inicio__lt=conf.fin)
                    | Q(conferencia__fin__gt=conf.inicio) & Q(conferencia__fin__lte=conf.fin)
                    | Q(conferencia__inicio__lt=conf.inicio) & Q(conferencia__fin__gt=conf.fin)).exists():
            raise ValidationError("No puedes asistir a más de una conferencia al mismo tiempo")

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response((ReadReservacionSerializer(Reservacion.objects.get(pk=serializer.data["id"]))).data, status=status.HTTP_201_CREATED, headers=headers)

        def destroy(self, request, *args, **kwargs):
            try:
                return super().destroy(request, args, kwargs)
            except ProtectedError:
                return Response({"detail": 'Otros registros referencian a esta reservacion'},
                                status=status.HTTP_400_BAD_REQUEST)