from rest_framework import permissions

# Permiso que permite que solo los administradores puedan insertar, actualizar
# y eliminar. De lo contrario, solo leer.
class EsAdminOrReadOnly(permissions.BasePermission):

    message = 'No tienes permiso para realizar esta acción'

    def has_permission(self, request, view):

        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user and request.user.is_authenticated:
            for group in request.user.groups.all():
                if group.name == 'ADMIN':
                    return True

        return False