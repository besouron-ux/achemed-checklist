from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Cliente, Consultorio, Checklist
from .serializers import ClienteSerializer, ConsultorioSerializer, ChecklistSerializer


@api_view(['DELETE'])
def clear_aptos(request):
    ids = request.data.get('ids', [])
    if ids:
        Checklist.objects.filter(id__in=ids, status="APTO").delete()
        return Response({"message": "Checklists aptos limpos com sucesso!"}, status=status.HTTP_200_OK)
    return Response({"error": "Nenhum ID fornecido."}, status=status.HTTP_400_BAD_REQUEST)


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


class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer


class ConsultorioViewSet(viewsets.ModelViewSet):
    queryset = Consultorio.objects.all()
    serializer_class = ConsultorioSerializer

    # Sobrescrevendo o método create para lidar com cliente vinculado
    def create(self, request, *args, **kwargs):
        cliente_id = request.data.get("cliente")
        if not Cliente.objects.filter(id=cliente_id).exists():
            return Response(
                {"error": "Cliente especificado não encontrado."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return super().create(request, *args, **kwargs)


class ClienteListView(APIView):
    def get(self, request):
        clientes = Cliente.objects.all()
        serializer = ClienteSerializer(clientes, many=True)
        return Response(serializer.data)


class ConsultoriosPorClienteView(APIView):
    def get(self, request, cliente_id):
        try:
            # Filtrar os consultórios vinculados ao cliente
            consultorios = Consultorio.objects.filter(cliente_id=cliente_id)

            # Verificar se há consultórios e serializar os resultados
            if consultorios.exists():
                serializer = ConsultorioSerializer(consultorios, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"message": "Nenhum consultório encontrado para este cliente."},
                    status=status.HTTP_404_NOT_FOUND,
                )

        except Exception as e:
            return Response(
                {"error": f"Erro ao buscar consultórios: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
