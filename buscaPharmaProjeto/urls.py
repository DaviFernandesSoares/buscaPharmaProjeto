from django.contrib import admin
from django.template.context_processors import request
from django.urls import path
from app_cad_usuario import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cadastro/', views.cadastro, name='cadastro' ),
    path('login/', views.login, name='login'),
    path('home/', views.home, name='home'),
]
