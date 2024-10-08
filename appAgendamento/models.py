from django.contrib.auth.decorators import login_required
from django.db import models

from appBusca.models import Unidade, Item
from appCadUsuario.models import Usuario


class Agendamento(models.Model):
    STATUS_CHOICES = (
        ('Agendado','agendado'),
        ('Cancelado','cancelado'),

    )
    id_agendamento = models.AutoField(primary_key=True)
    id_unidade = models.ForeignKey(Unidade, on_delete=models.CASCADE, db_column='id_unidade')
    id_item = models.ForeignKey(Item, on_delete=models.CASCADE,db_column='id_item')
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Agendado')
    data = models.DateField()
    hora = models.TimeField()

    class Meta:
        db_table = 'agendamento'
