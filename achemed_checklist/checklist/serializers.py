from rest_framework import serializers
from .models import Checklist
from .models import Cliente, Consultorio

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

class ConsultorioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultorio
        fields = "__all__"

class ClienteSerializer(serializers.ModelSerializer):
    consultorios = ConsultorioSerializer(many=True, read_only=True)

    class Meta:
        model = Cliente
        fields = "__all__"