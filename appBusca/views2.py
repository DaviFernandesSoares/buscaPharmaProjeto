import requests
from django.shortcuts import render, get_object_or_404
from .forms import BuscaForm
from .models import Item, Unidade, Estoque, Indicacao, Protocolo
import json
from urllib.parse import quote
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
    unidades = Unidade.objects.all()
    unidades_com_quantidade = []

    for unidade in unidades:
        estoque_item = Estoque.objects.filter(id_item=item, id_unidade=unidade).first()
        quantidade_atual = estoque_item.qtde_atual if estoque_item else 0
        endereco = unidade.endereco
        latitude, longitude = pegar_coordenadas_pelo_endereco(endereco)

        if quantidade_atual > 0:
            partes_endereco = endereco.split(", ")
            logradouro_e_numero = partes_endereco[0] + ", " + partes_endereco[1].strip() if len(partes_endereco) > 1 else endereco

            unidades_com_quantidade.append({
                'unidade': unidade,
                'quantidade_atual': quantidade_atual,
                'endereco': endereco,
                'logradouro_e_numero': logradouro_e_numero,
                'status': unidade.status,
                'latitude': latitude,
                'longitude': longitude,
            })

    context = {
        'item': item,
        'unidades_com_quantidade': unidades_com_quantidade
    }
    return render(request, 'localizarRemedio.html', context)


def pegar_coordenadas_pelo_endereco(endereco):
    api_key = 'YOUR_API_KEY_HERE'  # Substitua pela sua chave de API
    url = f'https://maps.googleapis.com/maps/api/geocode/json?address={quote(endereco)}&key={api_key}'

    try:
        response = requests.get(url)
        response.raise_for_status()  # Levanta um erro se a requisição falhar

        data = response.json()
        if data['status'] == 'OK' and data['results']:
            latitude = data['results'][0]['geometry']['location']['lat']
            longitude = data['results'][0]['geometry']['location']['lng']
            print(data)
            return latitude, longitude
        else:
            print(f"Erro na resposta da API: {data['status']}")
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")

    return None, None




