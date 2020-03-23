from django.contrib.auth.models import User

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class GetValidation(APIView):
    def get(self, request, format=None):
        users = User.objects.all()
        return Response({})
    #
    # def post(self, request, format=None):
    #     serializer = Serializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)