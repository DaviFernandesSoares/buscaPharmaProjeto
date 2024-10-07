from django.db import models

from appBusca.models import Unidade
from appCadUsuario.models import Usuario


class Agendamento(models.Model):
    STATUS_CHOICES = (
        ('Agendado','agendado'),
        ('Cancelado','cancelado'),

    )
    id_agendamento = models.AutoField(primary_key=True)
    id_unidade = models.ForeignKey(Unidade, on_delete=models.CASCADE)
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Agendado')
    data = models.DateField(auto_now=False, auto_now_add=True)
    hora = models.TimeField(auto_now=False, auto_now_add=True)

    class Meta:
        db_table = 'agendamento'
