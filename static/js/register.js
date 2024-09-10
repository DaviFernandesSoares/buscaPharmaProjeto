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
        cpfFormatado = cpfFormatado.slice(0, 3) + '.'+cpfFormatado.slice(3);
    }
    if(cpfFormatado.length > 7) {
        cpfFormatado = cpfFormatado.slice(0,7) + '.'+cpfFormatado.slice(7);
    }
    if(cpfFormatado.length > 11) {
        cpfFormatado = cpfFormatado.slice(0,11) + '-'+cpfFormatado.slice(11);
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
document.querySelector('form').addEventListener('submit', function(event) {
    let isValid = true;

      const emailInput = document.getElementById('email').value;
        const emailErro = document.getElementById('email-error');
        emailErro.textContent = ''; // Limpar mensagem de erro anterior
        emailErro.style.display = 'none'; // Esconder mensagem de erro

        if (!emailInput) {
            emailErro.textContent = 'O email é obrigatório.';
            emailErro.style.display = 'block'; // Exibir mensagem de erro
            isValid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput)) {
                emailErro.textContent = 'Formato de Email Inválido.'
                emailErro.style.display = 'block'; // Exibir mensagem de erro
                isValid = false;
            }
        }

        const nomeInput = document.getElementById('nome');
        const erroNome = document.getElementById('nome-error');
        erroNome.textContent = '';
        erroNome.style.display = 'none';

        if(!nomeInput){
            erroNome.textContent = 'O nome é obrigatório.'
            erroNome.style.display = 'block';
    }

    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    const cpfErro = document.getElementById('cpf-error');
    cpfErro.textContent = '';  // Limpa qualquer erro anterior
    cpfErro.style.display = 'none';  // Inicialmente, esconde o erro


    // Verifica se o CPF contém 11 dígitos
    if (!cpf) {
        cpfErro.textContent = 'O cpf é obrigatório.';
        cpfErro.style.display = 'block';  // Exibe o erro
        isValid = false;
    }
    else if(cpf.length !== 11) {
        cpfErro.textContent = 'O campo CPF precisa conter 11 dígitos.';
        cpfErro.style.display = 'block';  // Exibe o erro
        isValid = false;
    }
    const phone = document.getElementById('phone').value;
    const phoneError = document.getElementById('phone-error');
    phoneError.textContent = '';
    phoneError.style.display = 'none';

    if (!phone) {
        phoneError.textContent = 'O telefone é obrigatório.';
        phoneError.style.display = 'block';
        isValid = false;
    }
    else if(phone.length !== 10) {
        phoneError.textContent = 'O campo telefone deve conter 9 dígitos.';
        phoneError.style.display = 'block';
        isValid = false;
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
        isValid = false;
    } else if (!hasLowerCase) {
        passwordError.textContent = 'A senha deve conter pelo menos uma letra minúscula.';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (!hasUpperCase) {
        passwordError.textContent = 'A senha deve conter pelo menos uma letra maiúscula.';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (!hasSpecialChar) {
        passwordError.textContent = 'A senha deve conter pelo menos um caractere especial.';
        passwordError.style.display = 'block';
        isValid = false;
    }

    // Validar senha e confirmação de senha
    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'As senhas não são iguais.';
        confirmPasswordError.style.display = 'block';
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
    }
});