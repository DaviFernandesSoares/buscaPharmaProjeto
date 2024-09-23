from django.db import models


class Item(models.Model):
    nome_item = models.CharField(max_length=255)
    comp_ativ_itm = models.CharField(max_length=255)
    cod_item = models.IntegerField(unique=True, primary_key=True)
    def __str__(self):
        return self.nome_item
class Protocolo(models.Model):
    id_protocolo = models.AutoField(primary_key=True)
