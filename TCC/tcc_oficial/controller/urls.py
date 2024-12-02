from django.contrib import admin
from django.urls import path, include  # Certifique-se de importar include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('src.urls')),  # Inclui as rotas do app model
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
