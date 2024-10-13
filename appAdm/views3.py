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

            # Verifica se já existe um admin associado a essa unidade
            if Admin.objects.filter(id_unidade=unidade).exists():
                # Retorna mensagem de erro se já existir um admin
                return render(request, 'cadastro_admin.html', {
                    'error': 'Já existe um administrador com esse username associado a esta unidade.'
                })

            # Criando o usuário com a instância da Unidade
            user = Admin(username=nome, id_unidade=unidade, is_staff=1)
            user.set_password(senha)
            user.save()

            return redirect('login_admin')

    return render(request, 'cadastro_admin.html')


def login_adm(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        token = request.POST.get('token')
        senha = request.POST.get('senha')

        resposta = {
            'success': False,
            'username_existe': False,
            'senha_incorreta': False,
            'token_existe': False,
            'mensagem': ''
        }

        if username and token and senha:
            try:
                # Verifica se o usuário existe pelo username
                admin = Admin.objects.get(username=username)

                # Verifica se o token é válido
                if admin.id_unidade:  # Se o token está associado ao admin
                    if check_password(senha, admin.password):
                        auth_login(request, admin)
                        resposta['success'] = True
                        resposta['mensagem'] = 'Login bem-sucedido.'
                        return JsonResponse(resposta)  # Retorna JSON indicando sucesso
                    else:
                        resposta['senha_incorreta'] = True
                        resposta['mensagem'] = 'Senha incorreta.'
                else:
                    resposta['token_existe'] = True
                    resposta['mensagem'] = 'Token não encontrado.'

            except Admin.DoesNotExist:
                resposta['username_existe'] = True
                resposta['mensagem'] = 'Usuário não encontrado.'
        else:
            resposta['mensagem'] = 'Todos os campos são obrigatórios.'

        return JsonResponse(resposta)

    return render(request, 'login_admin.html')


