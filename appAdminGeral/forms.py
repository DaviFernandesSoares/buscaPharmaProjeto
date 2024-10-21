from django import forms
from .models import AdminGeral

class AdminGeralForm(forms.ModelForm):
    class Meta:
        model = AdminGeral
        fields = ['username', 'email', 'password', 'id_unidade', 'first_name', 'last_name']

