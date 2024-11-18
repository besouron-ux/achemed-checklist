from rest_framework import serializers
from .models import Checklist

class ChecklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checklist
        fields = '__all__'
