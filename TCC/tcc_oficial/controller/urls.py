from django.contrib import admin
from django.urls import path, include  # Certifique-se de importar include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('src.urls')),  # Inclui as rotas do app model
]
