from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from appBusca.models import Unidade

class Admin(AbstractUser):
    # Definindo o related_name para evitar conflitos
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='usuario_groups',  # Nome único
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='usuario_permissions',  # Nome único
        blank=True
    )
    username = models.CharField(max_length=150, unique=True)
    id_unidade  = models.ForeignKey(Unidade, on_delete=models.CASCADE, db_column='id_unidade')
    class Meta:
        db_table = 'admin'

