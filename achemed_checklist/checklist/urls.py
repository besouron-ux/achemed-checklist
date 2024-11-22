from django.urls import path
from . import views
from .views import clear_aptos

urlpatterns = [
    path('api/checklists/', views.ChecklistView.as_view(), name='checklist'),
    path('checklists/clear_aptos', clear_aptos, name='clear_aptos'),
]
