from django import forms
from .models import Feedback

class FeedbackForm(forms.ModelForm):
    class Meta:
        model = Feedback
        fields = ['nome_os', 'arquivo', 'feedback']  # Campos exibidos no formulário
