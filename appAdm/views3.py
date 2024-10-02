import json
from urllib import request
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import login as auth_login
from django.contrib.auth.hashers import make_password, check_password
from django.shortcuts import get_object_or_404

from appBusca.models import Unidade
from appCadUsuario.models import Usuario



def cadastro_adm(request):
    if request.method == 'POST':
        nome = request.POST['username']
        senha = request.POST['password']
        id_unidade = request.POST['token']

        # Buscando a instância de Unidade com base no ID
        unidade = get_object_or_404(Unidade, pk=id_unidade)

        # Criando o usuário com a instância da Unidade
        user = Usuario(username=nome, id_unidade=unidade, is_staff=1)
        user.set_password(senha)
        user.save()

        return redirect('login')

    return render(request, 'admin_register.html')

def login_adm(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        senha = request.POST.get('senha')
        resposta = {'success': False, 'email_existe': False, 'senha': False, 'mensagem': ''}

        if email:
            usuarios = Usuario.objects.filter(email=email)

            if usuarios.exists():
                if usuarios.count() == 1:
                    usuario = usuarios.first()
                    if check_password(senha, usuario.password):
                        auth_login(request,usuario)
                        resposta['success'] = True
                        resposta['mensagem'] = 'Login bem-sucedido.'
                        return JsonResponse(resposta)  # Retorna JSON indicando sucesso
                    else:
                        resposta['senha'] = True
                        resposta['mensagem'] = 'Email ou senha incorretos.'
                else:
                    resposta['email_existe'] = True
                    resposta['mensagem'] = 'Múltiplos usuários encontrados com o mesmo email.'
            else:
                resposta['email_existe'] = True
                resposta['mensagem'] = 'Email não encontrado.'
        else:
            resposta['email_existe'] = True
            resposta['mensagem'] = 'O email é obrigatório.'

        return JsonResponse(resposta)
    return


# View de home
def home(request):
    if request.user.is_authenticated:
        return render(request, 'home.html')
    else:
        return render(request,'login.html')