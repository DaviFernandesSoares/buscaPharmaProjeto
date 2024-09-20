from django.shortcuts import render
from .forms import BuscaForm
from .models import Item
import json

def busca(request):
    form = BuscaForm(request.GET or None)
    itens = Item.objects.all()

    if form.is_valid():
        query = form.cleaned_data['query']
        itens = itens.filter(nome_item__istartswith=query)

    # Para depuração, se necessário
    print("Itens encontrados:", itens)

    context = {
        'form': form,
        'itens': itens,
        'itens_json': json.dumps(list(itens.values('id', 'nome_item', 'comp_ativ_itm')))
    }

    return render(request, 'busca.html', context)

def medicamento(request, id):
    return
