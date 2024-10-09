from django.contrib import admin
from django.template.context_processors import request
from django.urls import path
from appCadUsuario import views
from appBusca import views2
from appAdm import views3
from appAgendamento import views4

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cadastro/', views.cadastro, name='cadastro'),
    path('login/', views.login, name='login'),
    path('home/', views.home, name='home'),
    path('busca/', views2.busca, name='busca'),
    path('verificar_existencia/', views.verificar_existencia, name='verificar_existencia'),
    path('busca/medicamento/<int:id_item>/', views2.medicamento, name='medicamento'),
    path('localizar_remedio/<int:id_item>/', views2.localizarMedicamento, name='localizar_remedio'),
    path('cadastro_admin/', views3.cadastro_adm, name='cadastro_admin'),
    path('login_admin/', views3.login_adm, name='login_admin'),
    path('agendar/<int:id_item>/<int:id_unidade>', views4.agendar , name='agendar'),
    path('horarios_disponiveis',views4.horarios_disponiveis, name='horarios_disponiveis'),
]
