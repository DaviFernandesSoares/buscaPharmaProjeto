from django.utils import timezone
from django.contrib.auth.decorators import login_required
import json
from django.http import JsonResponse
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
        data_json = json.loads(request.body)  # Decodifica o JSON
        data = data_json.get('data')  # Acessa o campo 'data'
        hora = data_json.get('hora')

        # Verifica se a data é menor que a data atual
        today = timezone.now().date()
        if data < today.strftime('%Y-%m-%d'):
            return JsonResponse(
                {'status': 'error', 'message': 'Data inválida. Não é possível agendar para datas passadas.'},
                status=400)

        # Verifica se já existe um agendamento para a mesma data e hora
        agendamento_existente = Agendamento.objects.filter(data=data, hora=hora, id_item=id_item,
                                                           id_unidade=id_unidade).exists()

        if agendamento_existente:
            return JsonResponse({'status': 'error', 'message': 'Já existe um agendamento para este horário.'},
                                status=400)

        if abertura <= hora <= fechamento:
            user = Agendamento(id_item=item, id_unidade=unidade_info, cpf=request.user, data=data, hora=hora)
            user.save()

            # Retornar uma resposta JSON para requisição AJAX
            return JsonResponse({'status': 'success', 'message': 'Agendamento realizado com sucesso!'})

        # Caso o horário esteja fora do intervalo permitido
        return JsonResponse({'status': 'error', 'message': 'O horário selecionado está fora do intervalo permitido.'},
                            status=400)

    today = timezone.now().date()
    return render(request, 'janelaAgendar.html', {
        'unidade': unidade_info,
        'item': item,
        'abertura': abertura,
        'fechamento': fechamento,
        'today': today,
    })


def horarios_disponiveis(request):
    data = request.GET.get('data')  # Pega a data da requisição GET

    # Consulta no banco para pegar os horários já agendados para aquela data
    agendamentos = Agendamento.objects.filter(data=data).values_list('hora', flat=True)

    # Retorna os horários ocupados
    return JsonResponse({
        'horarios_ocupados': list(agendamentos)
    })