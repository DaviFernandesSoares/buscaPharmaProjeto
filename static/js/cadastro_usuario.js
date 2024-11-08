function showPopup() {
    document.getElementById("password-popup").style.display = "block";
}

function closePopup() {
    document.getElementById("password-popup").style.display = "none";
}

// Para fechar o pop-up ao clicar fora dele
window.onclick = function(event) {
    const popup = document.getElementById("password-popup");
    if (event.target === popup) {
        closePopup();
    }
}

function desativarBotao(){
    const botao = document.getElementById('btn-registrar')
    botao.disabled = true;
}
function ativarBotao(){
    const botao = document.getElementById('btn-registrar')
    botao.disabled = false;
}

document.getElementById('show-password').addEventListener('change', function () {
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');

    if (this.checked) {
        passwordField.type = 'text';
        confirmPasswordField.type = 'text';
    } else {
        passwordField.type = 'password';
        confirmPasswordField.type = 'password';
    }
});

document.getElementById('cpf').addEventListener('input', function(event) {
    let input = event.target.value;
    // Remove todos os caracteres não numéricos
    let cpfFormatado = input.replace(/\D/g, '');

    // Adiciona o hífen quando o número tiver 9 dígitos
    if (cpfFormatado.length > 3) {
        cpfFormatado = cpfFormatado.slice(0, 3) + '.' + cpfFormatado.slice(3);
    }
    if (cpfFormatado.length > 7) {
        cpfFormatado = cpfFormatado.slice(0, 7) + '.' + cpfFormatado.slice(7);
    }
    if (cpfFormatado.length > 11) {
        cpfFormatado = cpfFormatado.slice(0, 11) + '-' + cpfFormatado.slice(11);
    }

    // Atualiza o valor do input
    event.target.value = cpfFormatado;
});

// Formata o número de telefone ao digitar
document.getElementById('phone').addEventListener('input', function(event) {
    let input = event.target.value;
    // Remove todos os caracteres não numéricos
    let formattedNumber = input.replace(/\D/g, '');

    // Adiciona o hífen quando o número tiver 9 dígitos
    if (formattedNumber.length > 5) {
        formattedNumber = formattedNumber.slice(0, 5) + '-' + formattedNumber.slice(5);
    }

    // Atualiza o valor do input
    event.target.value = formattedNumber;
});

document.getElementById('ddd-select').addEventListener('change', function() {
    const phoneField = document.getElementById('phone');
    phoneField.value = '';  // Limpa o campo do telefone
});
document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário
    desativarBotao();
    const emailInput = document.getElementById('email').value;
    const emailErro = document.getElementById('email-error');
    emailErro.textContent = ''; // Limpar mensagem de erro anterior
    emailErro.style.display = 'none'; // Esconder mensagem de erro

    if (!emailInput) {
        emailErro.textContent = 'O email é obrigatório.';
        emailErro.style.display = 'block'; // Exibir mensagem de erro
        ativarBotao()
        return
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            emailErro.textContent = 'Formato de Email Inválido.';
            emailErro.style.display = 'block'; // Exibir mensagem de erro
            ativarBotao()
            return
        }
    }

    const nomeInput = document.getElementById('nome').value;
    const erroNome = document.getElementById('nome-error');
    erroNome.textContent = '';
    erroNome.style.display = 'none';

    if (!nomeInput) {
        erroNome.textContent = 'O nome é obrigatório.';
        erroNome.style.display = 'block';
        ativarBotao()
        return
    }

    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    const cpfErro = document.getElementById('cpf-error');
    cpfErro.textContent = '';  // Limpa qualquer erro anterior
    cpfErro.style.display = 'none';  // Inicialmente, esconde o erro

    // Verifica se o CPF contém 11 dígitos
    if (!cpf) {
        cpfErro.textContent = 'O CPF é obrigatório.';
        cpfErro.style.display = 'block';  // Exibe o erro
        ativarBotao()
        return
    } else if (cpf.length !== 11) {
        cpfErro.textContent = 'O campo CPF precisa conter 11 dígitos.';
        cpfErro.style.display = 'block';  // Exibe o erro
        ativarBotao()
        return
    }

    const phone = document.getElementById('phone').value;
    const phoneError = document.getElementById('phone-error');
    phoneError.textContent = '';
    phoneError.style.display = 'none';

    if (!phone) {
        phoneError.textContent = 'O telefone é obrigatório.';
        phoneError.style.display = 'block';
        ativarBotao()
        return
    } else if (phone.length !== 10) {
        phoneError.textContent = 'O campo telefone deve conter 10 dígitos.';
        phoneError.style.display = 'block';
        ativarBotao()
        return
    }

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');

    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Limpar mensagens de erro
    passwordError.textContent = '';
    confirmPasswordError.textContent = '';
    passwordError.style.display = 'none';
    confirmPasswordError.style.display = 'none';

    // Validar a senha
    if (!password) {
        passwordError.textContent = 'A senha é obrigatória.';
        passwordError.style.display = 'block';
        ativarBotao()
        return
    } else if (!hasLowerCase) {
        passwordError.textContent = 'A senha deve conter pelo menos uma letra minúscula.';
        passwordError.style.display = 'block';
        ativarBotao()
        return
    } else if (!hasUpperCase) {
        passwordError.textContent = 'A senha deve conter pelo menos uma letra maiúscula.';
        passwordError.style.display = 'block';
        ativarBotao()
        return
    } else if (!hasSpecialChar) {
        passwordError.textContent = 'A senha deve conter pelo menos um caractere especial.';
        passwordError.style.display = 'block';
        ativarBotao()
        return
    } else if(password.length < 8){
        passwordError.textContent = 'A senha deve conter pelo menos 8 dígitos.';
        passwordError.style.display = 'block';
        ativarBotao()
        return
    }

    // Validar senha e confirmação de senha
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'As senhas não são iguais.';
        confirmPasswordError.style.display = 'block';
        ativarBotao()
        return
    }

    if (!validarCPF(cpf)) {
        cpfErro.textContent = 'Este CPF não é válido.';
        cpfErro.style.display = 'block';
        ativarBotao()
        return
    }

    const cpfFormatado = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
    const existeResponse = await fetch(`/verificar_existencia/?email=${emailInput}&cpf=${cpfFormatado}`).catch(e => e);
    const existeData = await existeResponse.json();
    if (existeData.email_existe) {
        emailErro.textContent = 'Este email já está cadastrado.';
        emailErro.style.display = 'block';  // Exibe o erro
        ativarBotao()
        return
    }
    if (existeData.cpf_existe) {
        cpfErro.textContent = 'Este CPF já está cadastrado.';
        cpfErro.style.display = 'block';
        ativarBotao()
        return
    }

    event.target.submit();
});
function validarCPF(cpf) {
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let peso = 10;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * peso--;
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    peso = 11;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * peso--;
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) return false;

    return true;
}