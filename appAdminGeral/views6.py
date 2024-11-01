from datetime import datetime,timedelta

from django.utils import timezone
from django.contrib.auth.decorators import user_passes_test, login_required
from django.http import JsonResponse
from django.contrib.auth import login as auth_login
from django.shortcuts import render, redirect, get_object_or_404

from appBusca.models import Unidade, Item, Estoque
from .forms import AdminGeralForm
from .models import Admin
from appAdm.views3 import cadastro_adm
from django.db.models import Value, CharField, Case, When
from appAdminGeral.models import Evento


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

    return render(request, 'login_adm_geral.html')







def criar_admin(request, senha):
    senha_admin = 'Jorge1234'
    if senha != senha_admin:
        return JsonResponse({'success': False, 'mensagem': 'Senha incorreta. Acesso negado.'}, status=403)
    else:
        if request.method == 'POST':

            form = AdminGeralForm(request.POST)

            if form.is_valid():
                admin = form.save(commit=False)
                admin.set_password(form.cleaned_data['password'])  # Certifique-se de usar a senha do formulário
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
            'username':username,
        }
        return render(request, 'home_admin_geral.html', context)
    except Admin.DoesNotExist:
        return render(request, '404.html')

def criar_evento(request,username,id_unidade):
    itens_da_unidade = Estoque.objects.filter(id_unidade=id_unidade).values_list('id_item', flat=True)
    itens = Item.objects.filter(id_item__in=itens_da_unidade)
    return render(request,'criar_evento.html',{'username':username, 'id_unidade':id_unidade,'itens':itens})


from django.utils import timezone
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from datetime import datetime, timedelta
from .models import Unidade, Item, Evento  # Ajuste conforme seus modelos

def salvar_evento(request, username):
    resposta = {
        'success': False,
        'mensagem': ''
    }

    if request.method == 'POST':
        try:
            # Captura os dados enviados no formulário
            descricao = request.POST.get('descricao_evento')
            data_inicio = request.POST.get('data_inicio')  # Formato: 'YYYY-MM-DD'
            data_termino = request.POST.get('data_termino')  # Formato: 'YYYY-MM-DD'
            id_unidade = request.POST.get('id_unidade')
            id_item = request.POST.get('id_item')

            # Verifica se os campos obrigatórios estão preenchidos
            if not all([descricao, data_inicio, data_termino, id_unidade, id_item]):
                resposta['mensagem'] = 'Todos os campos devem ser preenchidos.'
                return JsonResponse(resposta, status=400)

            # Verifica se a unidade e o item existem
            unidade = get_object_or_404(Unidade, id_unidade=id_unidade)
            item = get_object_or_404(Item, id_item=id_item)

            # Converte as strings de data para objetos datetime
            data_inicio_obj = timezone.make_aware(datetime.strptime(data_inicio + ' 00:00:00', '%Y-%m-%d %H:%M:%S'))
            data_termino_obj = timezone.make_aware(datetime.strptime(data_termino + ' 23:59:59', '%Y-%m-%d %H:%M:%S'))

            # Verifica se a data de término é válida
            if data_inicio_obj >= data_termino_obj:
                resposta['mensagem'] = 'Erro ao criar evento. Verifique o horário que vai ser iniciado e encerrado.'
                return JsonResponse(resposta, status=400)

            # Verifica se o evento está sendo criado com mais de uma hora de antecedência


            # Criação do evento
            evento = Evento(
                titulo=item.nome_item,
                descricao=descricao,
                data_inicio=data_inicio,
                data_termino=data_termino,
                id_unidade=unidade,
                id_item=item
            )
            evento.save()
            resposta['success'] = True
            resposta['mensagem'] = 'Evento criado com sucesso!'
            resposta['url'] = '/home_admin_geral/' + username  # URL para redirecionar após sucesso

        except Unidade.DoesNotExist:
            resposta['mensagem'] = 'Unidade não encontrada.'
        except Item.DoesNotExist:
            resposta['mensagem'] = 'Item não encontrado.'
        except Exception as e:
            resposta['mensagem'] = f'Erro ao salvar o evento: {str(e)}'

        return JsonResponse(resposta)

    return render(request, 'criar_evento.html')

