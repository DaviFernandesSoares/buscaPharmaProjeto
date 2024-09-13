from django.shortcuts import render
from .models import Item
from .forms import BuscaForm


def busca(request):
    form = BuscaForm(request.GET or None)
    itens = Item.objects.all()
    if form.is_valid():
        query = form.cleaned_data['query']
        itens = itens.filter(nome_item__icontains=query)
    context = {
        'form': form,
        'itens': itens,
    }


    return render(request, 'busca.html', context)