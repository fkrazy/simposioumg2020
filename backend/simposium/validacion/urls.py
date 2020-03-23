from django.urls import path

from .views import GetValidation

urlpatterns = [
    path('', GetValidation.as_view())
]
