from rest_framework.permissions import BasePermission, SAFE_METHODS


class PermisoTickets(BasePermission):
    message = 'No tienes permiso para realizar esta acción'

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return False

    def has_object_permission(self, request, view, obj):

        es_admin = False
        es_asistente = False

        # se busca si el usuario es admin y/o asistente
        for group in request.user.groups.all():
            es_admin = es_admin or group.name == 'ADMIN'
            es_asistente = es_asistente or group.name == 'ASISTENTE'

        # un admin tiene acceso a cualquier ticket
        if es_admin:
            return True

        # un asistente solo tiene acceso a su propio ticket
        if es_asistente and obj.asistente.usuario.id == request.user.id:
            return True

        return False