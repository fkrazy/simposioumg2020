from django.db.models import ProtectedError, Q
from rest_framework import viewsets, status, permissions
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import SAFE_METHODS
from rest_framework.response import Response

from ..models import Conferencia
from ..serializers import ConferenciaSerializer, ReadConferenciaSerializer
from ..permisos.commons import EsAdminOrReadOnly


class ConferenciaViewSet(viewsets.ModelViewSet):
    serializer_class = ConferenciaSerializer
    queryset = Conferencia.objects.all()
    permission_classes = [EsAdminOrReadOnly]

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return ReadConferenciaSerializer
        return ConferenciaSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # validacion de horarios
        inicio_nueva = request.data['inicio']
        fin_nueva = request.data['fin']
        if(Conferencia.objects.filter(Q(conferencista=request.data['conferencista']) | Q(salon=request.data['salon']))\
            .filter(Q(inicio__gte=inicio_nueva) & Q(inicio__lt=fin_nueva)
                    | Q(fin__gt=inicio_nueva) & Q(fin__lte=fin_nueva)
                    | Q(inicio__lt=inicio_nueva) & Q(fin__gt=fin_nueva))
                .exists()):
            raise ValidationError("Hay conflicto con otra conferencia")

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(ReadConferenciaSerializer(Conferencia.objects.get(tema=serializer.data["tema"]), context={"request": request}).data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        # partial = kwargs.pop('partial', False)
        instance = self.get_object()

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        try:
            inicio_nueva = request.data['inicio']
        except KeyError:
            inicio_nueva = instance.inicio
        try:
            fin_nueva = request.data['fin']
        except KeyError:
            fin_nueva = instance.fin
        try:
            conferencista = request.data['conferencista']
        except KeyError:
            conferencista = instance.conferencista
        try:
            salon = request.data['salon']
        except KeyError:
            salon = instance.salon
        if (Conferencia.objects.exclude(pk=instance.id).filter(Q(conferencista=conferencista) | Q(salon=salon)) \
                .filter(Q(inicio__gte=inicio_nueva) & Q(inicio__lt=fin_nueva)
                        | Q(fin__gt=inicio_nueva) & Q(fin__lte=fin_nueva)
                        | Q(inicio__lt=inicio_nueva) & Q(fin__gt=fin_nueva))
                .exists()):
            raise ValidationError("Hay conflicto con otra conferencia")

        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(ReadConferenciaSerializer(Conferencia.objects.get(pk=instance.id), context={"request": request}).data)

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, args, kwargs)
        except ProtectedError:
            return Response({"detail": 'Otros registros referencian a esta conferencia'}, status=status.HTTP_400_BAD_REQUEST )


