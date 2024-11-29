from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  # Rota inicial
    path('adm/admdashboard', views.adm_dashboard, name='adm_dashboard'),  # Rota para o painel de administração
]
