from django.shortcuts import render, get_object_or_404
from .forms import BuscaForm
from .models import Item, Unidade, Estoque
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
            'itens_json': json.dumps(list(itens.values('cod_item', 'nome_item', 'comp_ativ_itm')))
    }

        return render(request, 'busca.html', context)
    return  render(request, 'busca.html')

def medicamento(request, cod_item):
    cod_item = int(cod_item)
    item = Item.objects.filter(cod_item=cod_item)
    context = {
        'item': item,
        'itens_json': json.dumps(list(item.values('cod_item', 'nome_item', 'comp_ativ_itm')))
    }
    return render(request, 'produto.html', context)

def localizarMedicamento(request,cod_item):
    item = get_object_or_404(Item, cod_item=cod_item)
    unidades = Unidade.objects.all()  # Obtém todas as unidades
    unidades_com_quantidade = []

    # Para cada unidade, obtenha a quantidade atual do item
    for unidade in unidades:
        estoque_item = Estoque.objects.filter(id_item=item, id_unidade=unidade).first()
        quantidade_atual = estoque_item.qtde_atual if estoque_item else 0
        unidades_com_quantidade.append({
            'unidade': unidade,
            'quantidade_atual': quantidade_atual
        })

    context = {
        'item': item,
        'unidades_com_quantidade': unidades_com_quantidade  # Passa as unidades com suas quantidades
    }
    return render(request, 'localizarRemedio.html', context)