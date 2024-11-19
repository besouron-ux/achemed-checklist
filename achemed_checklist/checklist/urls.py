from django.urls import path
from . import views

urlpatterns = [
    path('api/checklists/', views.ChecklistView.as_view(), name='checklist'),
]
