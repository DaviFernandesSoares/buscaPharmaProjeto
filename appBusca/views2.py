import requests
from django.shortcuts import render, get_object_or_404
from .forms import BuscaForm
from .models import Item, Unidade, Estoque, Indicacao, Protocolo, Aux_item_indicacao
import json
from urllib.parse import quote
from django.http import HttpResponse, JsonResponse
import json
from django.shortcuts import render
from .forms import BuscaForm


def busca(request):
    form = BuscaForm(request.GET or None)
    itens = Item.objects.all()  # Inicializa com nenhum item

    if request.method == 'POST':
        nome = request.POST.get('busca')
        itens = Item.objects.filter(nome_item__icontains=nome)

    context = {
        'form': form,
        'itens_json': json.dumps(list(itens.values('id_item', 'nome_item', 'comp_ativ_itm')))
    }

    return render(request, 'busca.html', context)


def medicamento(request, id_item):
    id_item = int(id_item)
    item = Item.objects.filter(id_item=id_item)
    array_id_tipo = item.values('id_tipo')
    id_tipo = array_id_tipo[0]['id_tipo']
    if id_tipo == 1:
        aux_indicacao = Aux_item_indicacao.objects.get(id_item=id_item)
        id_indicacao = aux_indicacao.id_indicacao.id_indicacao
        indicacao = Indicacao.objects.get(id_indicacao=id_indicacao )

        context = {
            'item': item,
            'itens_json': json.dumps(list(item.values('id_item', 'nome_item', 'comp_ativ_itm'))),

            'indicacao': indicacao,
             'indicacao_json': json.dumps({
                'categoria_remedio': indicacao.categoria_remedio,
                'precaucao': indicacao.precaucao,
                'contra_indicacao': indicacao.contra_indicacao

            }),
            'aux_indicacao': aux_indicacao,
            'aux_indicacao_json': json.dumps({
                'dsgm_max_adlt': aux_indicacao.dsgm_max_adlt,
                'dsgm_max_crn': aux_indicacao.dsgm_max_crn


        }),
    }
    else:
        context = {'item': item,
                    'itens_json': json.dumps(list(item.values('id_item', 'nome_item', 'comp_ativ_itm')))}
    return render(request, 'produto.html', context)


def localizarMedicamento(request, id_item):
    item = get_object_or_404(Item, id_item=id_item)
    unidades = Unidade.objects.filter(status='Aberto')
    unidades_com_quantidade = []

    for unidade in unidades:
        estoque_item = Estoque.objects.filter(id_item=item, id_unidade=unidade).first()
        quantidade_atual = estoque_item.qtde_atual if estoque_item else 0
        endereco_api = pegar_endereco_por_cep_e_numero(unidade.cep,unidade.numero)
        latitude,longitude = pegar_coordenadas_pelo_endereco(endereco_api)
        if quantidade_atual > 0:
            partes_endereco = endereco_api.split(", ")
            logradouro_e_numero = partes_endereco[0] + ", " + partes_endereco[1].strip() if len(partes_endereco) > 1 else None

            unidades_com_quantidade.append({
                'unidade': unidade,
                'quantidade_atual': quantidade_atual,
                'endereco': endereco_api,
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
    api_key = 'chave'  # Substitua pela sua chave de API
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

def pegar_endereco_por_cep_e_numero(cep, numero):
        # Substitua pela URL da API que você está utilizando
    api_url = f'https://viacep.com.br/ws/{cep}/json/'
    try:
        response = requests.get(api_url)
        response.raise_for_status()  # Levanta um erro se a requisição falhar

        data = response.json()
        if 'erro' not in data:
            endereco_completo = f"{data['logradouro']}, {numero}, {data['bairro']}, {data['localidade']}-{data['uf']}"
            return endereco_completo  # Retorna o endereço completo
        else:
            print(f"Erro na resposta da API: {data['erro']}")
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição: {e}")

    return None
