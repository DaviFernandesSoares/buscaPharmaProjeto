from django.http import JsonResponse
from django.shortcuts import render,get_object_or_404
from appUsuario.models import Usuario


def editar_perfil_usuario(request):
    if request.method == 'POST':
        nome = request.POST.get('username')  # Corrigido para 'username'
        email = request.POST.get('email')
        cpf = request.POST.get('cpf')
        ddd = request.POST.get('ddd')
        telefone = ddd + request.POST.get('telefone')

        partes_nome = nome.split(' ')
        primeiro_nome = partes_nome[0]
        ultimo_nome = partes_nome[-1]
        try:
            usuario = get_object_or_404(Usuario,email=email)  # Usa get_object_or_404 para lidar com o caso em que o usuário não é encontrado
            usuario.nome = nome
            usuario.email = email
            usuario.username = email
            usuario.cpf = cpf
            usuario.telefone = telefone
            usuario.first_name = primeiro_nome
            usuario.last_name = ultimo_nome
            usuario.save()
            return JsonResponse({'status': 'success', 'message': 'Alteração Realizada!'}, status=200)
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    # Para métodos GET, você pode querer renderizar um formulário com dados do usuário
    usuario = get_object_or_404(Usuario, email=request.user.email)# Obtém o usuário logado
    telefone = request.user.telefone[2:]
    return render(request, 'editar_perfil.html', {'user': usuario,'telefone':telefone})




