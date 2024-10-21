import json
from urllib import request
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import login as auth_login
from django.contrib.auth.hashers import make_password, check_password
from django.template.defaultfilters import length

from appCadUsuario.models import Usuario


def verificar_existencia(request):
    email = request.GET.get('email', None)
    cpf = request.GET.get('cpf', None)

    resposta = {'email_existe': False, 'cpf_existe': False}

    if email and Usuario.objects.filter(email=email).exists():
        resposta['email_existe'] = True

    if cpf and Usuario.objects.filter(cpf=cpf).exists():
        resposta['cpf_existe'] = True

    return JsonResponse(resposta)

def cadastro(request):
    if request.method == 'POST':
        nome = request.POST['username']
        email = request.POST['email']
        cpf = request.POST['cpf']
        senha = request.POST['password']
        ddd = request.POST['ddd']
        telefone = ddd + request.POST['telefone']
        partes_nome = nome.split(' ')
        primeiro_nome = partes_nome[0]
        ultimo_nome = partes_nome[-1]
        if not Usuario.objects.filter(email=email).exists() and not Usuario.objects.filter(cpf=cpf).exists():
            user = Usuario(username=email, cpf=cpf, email=email, telefone=telefone,first_name=primeiro_nome, last_name=ultimo_nome)
            user.set_password(senha)
            user.save()
            return redirect('login')
    return render(request, 'cadastro.html')

def login(request):
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
    return render(request, 'login.html')


# View de home
def home(request):
        return render(request, 'home.html')
