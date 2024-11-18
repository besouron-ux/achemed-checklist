"""
URL configuration for achemed_checklist project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.http import HttpResponse
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from checklist.views import ChecklistViewSet

router = DefaultRouter()
router.register("checklists", ChecklistViewSet)

def home(request):
    return HttpResponse("Bem-vindo à API do Achemed Checklist!")

urlpatterns = [
    path('', home),  # Página inicial
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # Rotas da API
]


