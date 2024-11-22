from django.shortcuts import render
from rest_framework import viewsets
from .models import Checklist
from .serializers import ChecklistSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view


@api_view(['DELETE'])
def clear_aptos(request):
    ids = request.data.get('ids', [])
    if ids:
        Checklist.objects.filter(id__in=ids, status="APTO").delete()
        return Response({"message": "Checklists aptos limpos com sucesso!"}, status=200)
    return Response({"error": "Nenhum ID fornecido."}, status=400)

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