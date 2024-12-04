from django.db import models

class Feedback(models.Model):
    nome_os = models.CharField(max_length=255)  # Nome do usuário
    feedback = models.TextField()
    video = models.FileField(upload_to='videos/', blank=True, null=True)  # Arquivo de vídeo
    imagemArquivo = models.ImageField(upload_to='imagens/', blank=True, null=True)  # Imagem

    def __str__(self):
        return f"{self.nome_os} - {self.descricao[:30]}"


