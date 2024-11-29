from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def adm_dashboard(request):
    # Aqui você pode colocar a lógica necessária para o painel de administração, se houver
    return render(request, 'adm/admdashboard.html')  # Certifique-se de que o arquivo existe
