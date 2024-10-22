from django.contrib.auth.decorators import user_passes_test, login_required
from django.http import JsonResponse
from django.contrib.auth import login as auth_login
from django.shortcuts import render, redirect
from .forms import AdminGeralForm
from .models import Admin
from appAdm.views3 import cadastro_adm
from django.db.models import Value, CharField, Case, When


def is_superuser(user):
    return user.is_superuser

def login_adm_geral(request):
    resposta = {
        'success': False,
        'mensagem': ''
    }

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        if username and password:
            try:
                # Busca o admin com o username fornecido
                admin = Admin.objects.get(username=username)

                # Verifica se o admin é um superuser
                if admin.is_superuser:
                    # Verifica a senha
                    if admin.check_password(password):
                        auth_login(request, admin)
                        resposta['success'] = True
                        resposta['url'] = f'/home_admin_geral/{username}'  # URL para onde redirecionar
                    else:
                        resposta['mensagem'] = 'Senha incorreta. Tente novamente.'
                else:
                    resposta['mensagem'] = "Privilégio de Admin Geral não encontrado!"
            except Admin.DoesNotExist:
                resposta['mensagem'] = 'Admin não encontrado.'

        else:
            resposta['mensagem'] = 'Os campos devem ser preenchidos.'

        return JsonResponse(resposta)

    return render(request, 'login_Adm_Geral.html')





senha_admin = 'Jorge1234'


def criar_admin(request,senha):
    if request.method == 'POST':
        form = AdminGeralForm(request.POST)

        if form.is_valid():
            admin = form.save(commit=False)
            admin.set_password(form.cleaned_data['password'])
            admin.is_superuser = True
            admin.is_staff = True
            admin.save()
            return JsonResponse({'success': True, 'mensagem': 'Admin criado com sucesso!'})
        else:
            return JsonResponse({'success': False, 'mensagem': 'Erro ao criar Admin. Verifique os dados.'})

    # Se não for um POST, cria um formulário vazio
    form = AdminGeralForm()
    return render(request, 'criar_admin.html', {'form': form})


def home_admin_geral(request,username):
    try:
        admin = Admin.objects.get(username=username)
        id_unidade = admin.id_unidade.id_unidade

        # Filtrando admins que são staff
        admins_da_unidade = Admin.objects.filter(id_unidade=id_unidade, is_staff=True,is_superuser=False)

        # Crie uma lista de usuários autenticados
        authenticated_admins = [user.username for user in admins_da_unidade if user.is_authenticated]

        # Adiciona o status manualmente
        for admin in admins_da_unidade:
            admin.status = 'online' if admin.username in authenticated_admins else 'offline'
        context = {
            'admins': admins_da_unidade,
            'id_unidade': id_unidade,
        }
        return render(request, 'home_admin_geral.html', context)
    except Admin.DoesNotExist:
        return render(request, '404.html')

def criar_admin_unidade(request,id_unidade):
    return cadastro_adm(request,id_unidade=id_unidade)