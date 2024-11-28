from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import ConsultoriosPorClienteView

router = DefaultRouter()
router.register(r'clientes', views.ClienteViewSet)
router.register(r'consultorios', views.ConsultorioViewSet)

urlpatterns = [
    path('api/clientes/', views.ClienteListView.as_view(), name='clientes'),
    # listar consultórios de um cliente específico.
    path('api/consultorios/<int:cliente_id>/', views.ConsultoriosPorClienteView.as_view(), name='consultorios-por-cliente'),
    # listar clientes e consultórios.
    path('api/', include(router.urls)),
    path('api/checklists/', views.ChecklistView.as_view(), name='checklist'),
    path('checklists/clear_aptos', views.clear_aptos, name='clear_aptos'),
    # página de checklist para consultório específico.
    path('consultorios/<int:consultorio_id>/checklist/', views.ChecklistView.as_view(), name='checklist'),
]
