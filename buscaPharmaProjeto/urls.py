from django.contrib import admin
from django.template.context_processors import request
from django.urls import path
from app_cad_usuario import views
from appBusca import views2

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cadastro/', views.cadastro, name='cadastro' ),
    path('login/', views.login, name='login'),
    path('home/', views.home, name='home'),
    path('busca/', views2.busca, name='busca'),
    path('busca/medicamento/<int:cod_item>/', views2.medicamento, name='medicamento'),
]
