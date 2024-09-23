from django.db import models


class Item(models.Model):
    nome_item = models.CharField(max_length=255)
    comp_ativ_itm = models.CharField(max_length=255)
    cod_item = models.AutoField(unique=True, primary_key=True)
    def __str__(self):
        return self.nome_item

class Unidade(models.Model):
    STATUS_CHOICES = (
        ('Aberto', 'aberto'),
        ('Em manutenção', 'em manutenção'),
        ('Fechado', 'fechado'),
    )

    nome = models.CharField(max_length=130)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='Aberto')
    cep = models.CharField(max_length=9)

    def __str__(self):
        return self.nome

class Estoque(models.Model):
    id_item = models.ForeignKey(Item, on_delete=models.CASCADE)
    id_unidade = models.ForeignKey(Unidade, on_delete=models.CASCADE)
    qtde_atual = models.IntegerField()

    def __str__(self):
        return f"{self.id_item.nome_item} - {self.id_unidade.nome}"
class Protocolo(models.Model):
    id_protocolo = models.AutoField(primary_key=True)
