import requests
from django.shortcuts import render, get_object_or_404
from .forms import BuscaForm
from .models import Item, Unidade, Estoque, Indicacao, Protocolo
import json
from django.http import HttpResponse, JsonResponse
def busca(request):
    form = BuscaForm(request.GET or None)

    if request.method == 'POST':
        nome = request.POST.get('busca')
        itens = Item.objects.filter(nome_item__icontains=nome)
        context = {
            'form': form,
            'itens': itens,
            'itens_json': json.dumps(list(itens.values('id_item', 'nome_item', 'comp_ativ_itm')))
    }

        return render(request, 'busca.html', context)
    return  render(request, 'busca.html')

def medicamento(request, id_item):
    id_item = int(id_item)
    item = Item.objects.filter(id_item=id_item)
    indicacao = Indicacao.objects.get(id_indicacao=id_item)

    context = {
        'item': item,
        'itens_json': json.dumps(list(item.values('id_item', 'nome_item', 'comp_ativ_itm'))),

        'indicacao': indicacao,
        'indicacao_json': json.dumps({
            'categoria_remedio': indicacao.categoria_remedio,
            'precaucao': indicacao.precaucao,
            'contra_indicacao': indicacao.contra_indicacao
        }),
    }

    return render(request, 'produto.html', context)


def localizarMedicamento(request, id_item):
    item = get_object_or_404(Item, id_item=id_item)
    unidades = Unidade.objects.all()  # Obtém todas as unidades
    unidades_com_quantidade = []

    for unidade in unidades:
        estoque_item = Estoque.objects.filter(id_item=item, id_unidade=unidade).first()
        quantidade_atual = estoque_item.qtde_atual if estoque_item else 0
        cep = unidade.cep
        latitude, longitude = pegar_coordenadas_pelo_cep(cep)

        if quantidade_atual > 0:
            unidades_com_quantidade.append({
                'unidade': unidade,
                'quantidade_atual': quantidade_atual,
                'cep': unidade.cep,
                'status': unidade.status,
                'latitude': latitude,
                'longitude': longitude,
            })

    # Adicione o print aqui para verificar
    print(unidades_com_quantidade)  # Verifique o que está sendo retornado

    context = {
        'item': item,
        'unidades_com_quantidade': unidades_com_quantidade
    }
    return render(request, 'localizarRemedio.html', context)

def pegar_coordenadas_pelo_cep(cep):
    api_key = 'SUA_CHAVE_DE_API_AQUI'  # Substitua pela sua chave de API
    url = f'https://maps.googleapis.com/maps/api/geocode/json?address={cep}&key={api_key}'
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        if data['results']:
            latitude = data['results'][0]['geometry']['location']['lat']
            longitude = data['results'][0]['geometry']['location']['lng']
            return latitude, longitude
    return None, None
