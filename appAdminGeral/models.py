from django.contrib.auth.models import AbstractUser
from django.db import models
from appBusca.models import Unidade
from appAdm.models import Admin

class AdminGeral(Admin):
    id_admin = models.IntegerField(primary_key=True,db_column='id_adm')


