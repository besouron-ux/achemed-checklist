from rest_framework import serializers
from .models import Checklist

class ChecklistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Checklist
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        # Garante que campos booleanos retornem False em vez de None
        for field in [
            "processador",
            "ram",
            "armazenamento",
            "sistema",
            "monitor",
            "webcam",
            "microfone",
            "autoFalantes",
            "internet",
            "navegador",
        ]:
            representation[field] = representation[field] or False
        return representation
