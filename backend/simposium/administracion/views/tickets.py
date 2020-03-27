from rest_framework import viewsets, mixins

from ..models import Ticket
from ..serializers import TicketSerializer
from ..permisos import PermisoTickets


class TicketViewSet(mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
    permission_classes = [PermisoTickets]