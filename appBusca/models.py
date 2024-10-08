from django.db import models


class Item(models.Model):
    nome_item = models.CharField(max_length=255)
    comp_ativ_itm = models.CharField(max_length=255)
    id_item = models.IntegerField(unique=True, primary_key=True)
    def __str__(self):
        return self.nome_item

    class Meta:
        db_table = 'item'
class Unidade(models.Model):
    STATUS_CHOICES = (
        ('Aberto', 'aberto'),
        ('Fechado', 'fechado'),
    )

    nome = models.CharField(max_length=130)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='Aberto')
    endereco = models.CharField(max_length=255)
    id_unidade = models.AutoField(unique=True, primary_key=True)
    hora_abertura = models.TimeField()
    hora_encerramento = models.TimeField()
    class Meta:
        db_table = 'unidade'
    def __str__(self):
        return self.nome

class Estoque(models.Model):
    id_item = models.ForeignKey(Item, on_delete=models.CASCADE, db_column='id_item')
    id_unidade = models.ForeignKey(Unidade, on_delete=models.CASCADE, db_column='id_unidade')
    qtde_atual = models.IntegerField()
    id_estoque = models.AutoField(primary_key=True)
    class Meta:
        db_table = 'estoque'
    def __str__(self):
        return f"{self.id_item.nome_item} - {self.id_unidade.nome}"
class Protocolo(models.Model):
    id_protocolo = models.AutoField(primary_key=True)
    id_item = models.ForeignKey(Item, on_delete=models.CASCADE, db_column='id_item')
    documento_necessarios = models.CharField(max_length=255)
    exames = models.CharField(max_length=255)
    class Meta:
        db_table = 'protocolo'
class Indicacao(models.Model):
    id_indicacao = models.AutoField(primary_key=True)
    categoria_remedio = models.CharField(max_length=255)
    precaucao = models.CharField(max_length=255)
    contra_indicacao = models.CharField(max_length=255)
    class Meta:
        db_table = 'indicacao'