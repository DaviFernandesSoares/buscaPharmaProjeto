from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from appAgendamento.models import Agendamento
from appBusca.models import Unidade, Item


# Create your views here.
@login_required(login_url='login')
def agendar(request, id_item, id_unidade):
    unidade_info = get_object_or_404(Unidade, id_unidade=id_unidade)
    item = Item.objects.get(id_item=id_item)  # Ajuste de acordo com seu modelo
    abertura = unidade_info.hora_abertura.strftime("%H:%M")
    fechamento = unidade_info.hora_encerramento.strftime("%H:%M")
    # Renderize a página de agendamento, passando a unidade e o item selecionado
    if request.method == 'POST':
        data = request.POST.get('data')
        hora = request.POST.get('hora')
        if abertura <= hora <= fechamento:
            user = Agendamento(id_item = item, id_unidade = unidade_info, id_usuario=request.user  ,data=data, hora=hora)
            user.save()
            return redirect('login')

    return render(request, 'janelaAgendar.html', {
        'unidade': unidade_info,
        'item': item,
        'abertura': abertura,
        'fechamento': fechamento
    })