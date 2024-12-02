from django.db import models

class Feedback(models.Model):
    nome_os = models.CharField(max_length=255)
    arquivo = models.FileField(upload_to='uploads/')
    feedback = models.TextField()

    def __str__(self):
        return self.nomeos
