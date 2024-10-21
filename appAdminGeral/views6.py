from django.contrib.auth.decorators import user_passes_test, login_required
from django.http import JsonResponse
from django.contrib.auth import login as auth_login
from django.shortcuts import render, redirect
from .forms import AdminGeralForm
from .models import AdminGeral


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
                admin = AdminGeral.objects.get(username=username)

                # Verifica se o admin é um superuser
                if admin.is_superuser:
                    # Verifica a senha
                    if admin.check_password(password):
                        auth_login(request, admin)
                        resposta['success'] = True
                        resposta['url'] = '/home_admin_geral/'  # URL para onde redirecionar
                    else:
                        resposta['mensagem'] = 'Senha incorreta. Tente novamente.'
                else:
                    resposta['mensagem'] = "Privilégio de Admin Geral não encontrado!"
            except AdminGeral.DoesNotExist:
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
            admin.is_superuser()
            admin.is_staff()
            admin.save()
            return JsonResponse({'success': True, 'mensagem': 'Admin criado com sucesso!'})
        else:
            return JsonResponse({'success': False, 'mensagem': 'Erro ao criar Admin. Verifique os dados.'})

    # Se não for um POST, cria um formulário vazio
    form = AdminGeralForm()
    return render(request, 'criar_admin.html', {'form': form})

@login_required(login_url='login_admin_geral')
@user_passes_test(is_superuser)
def home_admin_geral(request):
    return render(request,'homeAdminGeral.html')