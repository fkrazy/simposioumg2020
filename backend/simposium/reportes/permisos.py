
from rest_framework.permissions import BasePermission


class PermisoReportes(BasePermission):

    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        for group in request.user.groups.all():
            if group.name == 'ADMIN':
                return True
        return False