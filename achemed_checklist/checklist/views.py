from django.shortcuts import render
from rest_framework import viewsets
from .models import Checklist
from .serializers import ChecklistSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status



class ChecklistViewSet(viewsets.ModelViewSet):
    queryset = Checklist.objects.all()
    serializer_class = ChecklistSerializer

class ChecklistView(APIView):
    def post(self, request):
        serializer = ChecklistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)