import json
from urllib import request
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import login as auth_login
from django.contrib.auth.hashers import make_password, check_password
from django.shortcuts import get_object_or_404

from appBusca.models import Unidade
from appAdm.models import Admin



def cadastro_adm(request):
    if request.method == 'POST':
        nome = request.POST['username']
        senha = request.POST['password']
        id_unidade = request.POST['token']

        if nome and senha and id_unidade:
            unidade = get_object_or_404(Unidade, pk=id_unidade)

            # Criando o usuário com a instância da Unidade
            user = Admin(username=nome, id_unidade=unidade, is_staff=1)
            user.set_password(senha)
            user.save()

            return redirect('login_adm')

    return render(request, 'admin_register.html')

def login_adm(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        token = request.POST.get('token')
        senha = request.POST.get('senha')
        resposta = {'success': False, 'username_existe': False, 'senha': False,'token_existe' : False, 'mensagem': ''}

        if username and token and senha:
            admins = Admin.objects.filter(username= 'username')

            if admins.exists():
                if admins.count() == 1:
                    admin = admins.first()
                    if check_password(senha, admin.password):
                        auth_login(request,admin)
                        resposta['success'] = True
                        resposta['mensagem'] = 'Login bem-sucedido.'
                        return JsonResponse(resposta)  # Retorna JSON indicando sucesso
                    else:
                        resposta['senha'] = True
                        resposta['mensagem'] = 'Username ou senha incorretos.'
                else:
                    resposta['username_existe'] = True
                    resposta['mensagem'] = 'Múltiplos usuários encontrados com o mesmo username.'
            else:
                resposta['token_existe'] = True
                resposta['mensagem'] = 'token não encontrado.'
        else:
            resposta['token_existe'] = True
            resposta['mensagem'] = 'O token é obrigatório.'

        return JsonResponse(resposta)
    return render(request, 'login_admin.html')

