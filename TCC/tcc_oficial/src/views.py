from django.shortcuts import render, redirect
from .forms import FeedbackForm

def index(request):
    return render(request, 'index.html')

def adm_dashboard(request):
    # Aqui você pode colocar a lógica necessária para o painel de administração, se houver
    return render(request, 'adm/adm-dashboard.html')  # Certifique-se de que o arquivo existe

def feedback_adm(request):
    return render(request, 'adm/feedback.html')

def funcionarios(request):
    return render(request, 'adm/funcionarios.html')

def novo_feedback(request):
    return render(request, 'adm/novo-feedback.html')

def novo_funcionario(request):
    return render(request, 'adm/novo-funcionario.html')

def novoservico_adm(request):
    return render(request, 'adm/novo-servico.html')

def servico(request):
    return render(request, 'adm/servicos.html')

def geral_dashboard(request):
    return render(request, 'geral/geral-dashboard.html')

def feedback_geral(request):
    return render(request, 'geral/feedback.html')

def novoservico_geral(request):
    return render(request, 'geral/novo-servico.html')

def manutencao_dashboard(request):
    return render(request, 'manutencao/manutencao-dashboard.html')

def detalhes(request):
    return render(request, 'manutencao/detalhes.html')

def feedback_view(request):
    if request.method == 'POST':  # Quando o formulário for enviado
        form = FeedbackForm(request.POST, request.FILES)  # Inclua arquivos enviados
        if form.is_valid():
            form.save()  # Salva no banco de dados
            return redirect('feedback_adm')  # Redireciona para uma página de sucesso
    else:
        form = FeedbackForm()  # Formulário vazio para exibir na página
    return render(request, 'adm/novo-feedback.html', {'form': form})

