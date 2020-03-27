from django.contrib import admin
from django.urls import path
from .views import signin, registrar


urlpatterns = [
    path('login/', signin),
    path('registro/', registrar)
]