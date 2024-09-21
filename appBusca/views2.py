from django.shortcuts import render
from .forms import BuscaForm
from .models import Item
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
