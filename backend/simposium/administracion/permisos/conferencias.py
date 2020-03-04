from rest_framework import permissions


class PermisoConferencias(permissions.BasePermission):

    def has_permission(self, request, view):

        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user and request.user.is_authenticated:
            for group in request.user.groups.all():
                if group.name == 'ADMIN':
                    return True

        return False