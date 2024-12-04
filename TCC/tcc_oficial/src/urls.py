from django.urls import path
from . import views
from .views import feedback_view

urlpatterns = [
    path('', views.index, name='index'),  # Rota inicial

    path('feedback/', feedback_view, name='feedback'),  # URL para acessar o formulário

    # Rotas para a parte de Administração
    path('adm/admdashboard', views.adm_dashboard, name='adm_dashboard'),  # Rota para o painel de administração
    path('adm/funcionarios/', views.funcionarios, name='funcionarios'),
    path('adm/novo-feedback/', views.novo_feedback, name='novo_feedback'),
    path('adm/novo-funcionario/', views.novo_funcionario, name='novo_funcionario'),
    path('adm/novo-servico/', views.novoservico_adm, name='novo_servico_adm'),
    path('adm/servico/', views.servico, name='servico'),
    path('adm/feedback', views.feedback_adm, name='feedback_adm'),

    # Rotas para o Dashboard Geral
    path('geral/dashboard/', views.geral_dashboard, name='geral_dashboard'),
    path('geral/feedback/', views.feedback_geral, name='feedback_geral'),
    path('geral/novo-servico/', views.novoservico_geral, name='novo_servico_geral'),

    # Rotas para a parte de Manutenção
    path('manutencao/dashboard/', views.manutencao_dashboard, name='manutencao_dashboard'),
    path('manutencao/detalhes/', views.detalhes, name='detalhes'),
]
