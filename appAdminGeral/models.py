from django.contrib.auth.models import AbstractUser
from django.db import models
from appBusca.models import Unidade
from appAdm.models import Admin
from appBusca.models import Item,Unidade

class Evento(models.Model):
    id_evento = models.AutoField(primary_key=True,db_column='id_evento')
    id_item = models.ForeignKey(Item,on_delete=models.CASCADE, db_column='id_item')
    id_unidade = models.ForeignKey(Unidade,on_delete=models.CASCADE, db_column='id_unidade')
    data_evento = models.DateField(db_column='data_evento')
    descricao = models.TextField(max_length=255,db_column='descricao')
    horario_inicio = models.TimeField(db_column='horario_inicio')
    horario_encerramento = models.TimeField(db_column='horario_encerramento')
    class Meta:
        db_table = 'evento'


