from django.shortcuts import render
from rest_framework import viewsets
from .models import Checklist
from .serializers import ChecklistSerializer

class ChecklistViewSet(viewsets.ModelViewSet):
    queryset = Checklist.objects.all()
    serializer_class = ChecklistSerializer

