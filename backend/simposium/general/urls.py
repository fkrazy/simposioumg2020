from django.contrib import admin
from django.urls import path
from .views import signin


urlpatterns = [
    path('login/', signin)
]