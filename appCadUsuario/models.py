from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from appBusca.models import Unidade
class Usuario(AbstractUser):
    telefone = models.CharField(max_length=15, blank=True, null=True)
    id_protocolo = models.AutoField(primary_key=True)
    cpf = models.CharField(max_length=14, unique=True)
    id_unidade = models.ForeignKey(Unidade, on_delete=models.SET_NULL, blank=True, null=True, db_column='id_unidade')
    class Meta:
        db_table = 'usuario'
    class criarUsuario(BaseUserManager):
        def create_user(self, id_unidade, password=None, **extra_fields):
            if not id_unidade:
                raise ValueError('Id')
            user = self.model(id_unidade = id_unidade, **extra_fields)
            user.set_password(password)
            user.save()
