from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import login as login_django, authenticate
from django.contrib.auth.hashers import make_password, check_password
from pyexpat.errors import messages

from app_cad_usuario.models import Usuario

# View de cadastro

def verificar_existencia(request):
    email = request.GET.get('email', None)
    cpf = request.GET.get('cpf', None)

    resposta = {'email_existe': False, 'cpf_existe': False}

    if email and Usuario.objects.filter(email=email).exists():
        resposta['email_existe'] = True

    if cpf and Usuario.objects.filter(cpf=cpf).exists():
        resposta['cpf_existe'] = True

    return JsonResponse(resposta)

def cadastro(request):
    if request.method == 'POST':
        nome = request.POST['username']
        email = request.POST['email']
        cpf = request.POST['cpf']
        senha = request.POST['password']
        ddd = request.POST['ddd']
        telefone = ddd + request.POST['telefone']


        user = Usuario(username=nome, cpf=cpf, email=email, telefone=telefone)
        user.set_password(senha)
        user.save()

        return redirect('login')
    return render(request, 'cadastro.html')



# View de login
def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    else:
        email = request.POST['email']
        password = request.POST['password']

        user = Usuario.objects.filter(email=email).first()
        try:
            if user.check_password(password):
                login_django(request, user)
                return redirect('home')
            else:
                return render(request, 'login_falha.html')
        except Exception as e:
            return render(request, 'login_falha.html')



# View de home
def home(request):
    if request.user.is_authenticated:
        return render(request, 'home.html')
    else:
        return HttpResponse("Não autorizado")