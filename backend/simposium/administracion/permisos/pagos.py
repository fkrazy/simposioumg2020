from rest_framework import permissions


class PermisoPagos(permissions.BasePermission):

    message = 'No tienes permiso para realizar esta acción'

    def has_permission(self, request, view):
        # si el usuario no esta autenticado, no tiene permiso
        if not (request.user and request.user.is_authenticated):
            return False

        es_admin = False
        es_asistente = False

        # se busca si el usuario es admin y/o asistente
        for group in request.user.groups.all():
            if group.name == 'ADMIN':
                es_admin = True
            if group.name == 'ASISTENTE':
                es_asistente = True

        # si el usuario no es admin o asistente, no tiene permiso
        if not(es_admin or es_asistente):
            return False

        # tanto admins como asistentes pueden realizar las siguientes operaciones
        if request.method in ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH']:
            return True

        if request.method == 'DELETE' and es_admin:
            return True

        return False


    def has_object_permission(self, request, view, obj):

        es_admin = False
        es_asistente = False

        # se busca si el usuario es admin y/o asistente
        for group in request.user.groups.all():
            if group.name == 'ADMIN':
                es_admin = True
            if group.name == 'ASISTENTE':
                es_asistente = True

        # un admin tiene acceso a cualquier pago
        if es_admin:
            return True

        # un asistente tiene accesos a su propio pago
        if es_asistente and obj.titular.usuario.id == request.user.id:
            return True

        return False