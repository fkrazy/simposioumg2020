from rest_framework.permissions import BasePermission, SAFE_METHODS


class PermisoReservaciones(BasePermission):
    message = 'No tienes permiso para realizar esta acción'

    def has_permission(self, request, view):

        es_admin = False
        es_asistente = False

        # se busca si el usuario es admin y/o asistente
        for group in request.user.groups.all():
            es_admin = es_admin or group.name == 'ADMIN'
            es_asistente = es_asistente or group.name == 'ASISTENTE'

        return ((es_admin or es_asistente) and request.method in SAFE_METHODS) or (es_asistente and request.method == 'POST')

    def has_object_permission(self, request, view, obj):

        es_admin = False
        es_asistente = False

        # se busca si el usuario es admin y/o asistente
        for group in request.user.groups.all():
            es_admin = es_admin or group.name == 'ADMIN'
            es_asistente = es_asistente or group.name == 'ASISTENTE'

        # un admin solo puede leer las reservaciones y
        # un asistente solo puede leer o eliminar sus propias reservaciones
        return (not es_asistente and es_admin and request.method in SAFE_METHODS) \
               or (es_asistente and obj.asistente.usuario.id == request.user.id
                   and (request.method in SAFE_METHODS or request.method == 'DELETE'))