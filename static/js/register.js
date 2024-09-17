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
    let cpfFormatado = input.replace(/\D/g, '');

    if (cpfFormatado.length > 3) {
        cpfFormatado = cpfFormatado.slice(0, 3) + '.' + cpfFormatado.slice(3);
    }
    if (cpfFormatado.length > 7) {
        cpfFormatado = cpfFormatado.slice(0, 7) + '.' + cpfFormatado.slice(7);
    }
    if (cpfFormatado.length > 11) {
        cpfFormatado = cpfFormatado.slice(0, 11) + '-' + cpfFormatado.slice(11);
    }

    event.target.value = cpfFormatado;
});

document.getElementById('phone').addEventListener('input', function(event) {
    let input = event.target.value;
    let formattedNumber = input.replace(/\D/g, '');

    if (formattedNumber.length > 5) {
        formattedNumber = formattedNumber.slice(0, 5) + '-' + formattedNumber.slice(5);
    }

    event.target.value = formattedNumber;
});

document.getElementById('ddd-select').addEventListener('change', function() {
    const phoneField = document.getElementById('phone');
    phoneField.value = '';  // Limpa o campo do telefone
});

document.querySelector('form').addEventListener('submit', async function(event) {
    let isValid = true;

    const emailInput = document.getElementById('email').value;
    const emailErro = document.getElementById('email-error');
    emailErro.textContent = '';
    emailErro.style.display = 'none';

    if (!emailInput) {
        emailErro.textContent = 'O email é obrigatório.';
        emailErro.style.display = 'block';
        isValid = false;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            emailErro.textContent = 'Formato de Email Inválido.';
            emailErro.style.display = 'block';
            isValid = false;
        }
    }

    const nomeInput = document.getElementById('nome').value;
    const erroNome = document.getElementById('nome-error');
    erroNome.textContent = '';
    erroNome.style.display = 'none';

    if (!nomeInput) {
        erroNome.textContent = 'O nome é obrigatório.';
        erroNome.style.display = 'block';
        isValid = false;
    }

    const cpf = document.getElementById('cpf').value.replace(/\D/g, '');
    const cpfErro = document.getElementById('cpf-error');
    cpfErro.textContent = '';
    cpfErro.style.display = 'none';

    if (!cpf) {
        cpfErro.textContent = 'O CPF é obrigatório.';
        cpfErro.style.display = 'block';
        isValid = false;
    } else if (cpf.length !== 11) {
        cpfErro.textContent = 'O campo CPF precisa conter 11 dígitos.';
        cpfErro.style.display = 'block';
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
    } else if (phone.length !== 10) {
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

    passwordError.textContent = '';
    confirmPasswordError.textContent = '';
    passwordError.style.display = 'none';
    confirmPasswordError.style.display = 'none';

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

    if (password !== confirmPassword) {
        confirmPasswordError.textContent = 'As senhas não são iguais.';
        confirmPasswordError.style.display = 'block';
        isValid = false;
    }

    // Função para verificar e-mail
    async function checkEmail(email) {
        try {
            const response = await fetch(`/verificar_existencia/?email=${email}`);
            const data = await response.json();
            if (data.email_existe) {
                emailErro.textContent = 'Este email já está cadastrado.';
                emailErro.style.display = 'block';
                isValid = false;
            }
        } catch (error) {
            console.error('Erro ao verificar o email:', error);
            isValid = false;
        }
    }

    // Função para verificar CPF
    async function checkCpf(cpf) {
        try {
            const response = await fetch(`/verificar_existencia/?cpf=${cpf}`);
            const data = await response.json();
            if (data.cpf_existe) {
                cpfErro.textContent = 'Este CPF já está cadastrado.';
                cpfErro.style.display = 'block';
                isValid = false;
            }
        } catch (error) {
            console.error('Erro ao verificar o CPF:', error);
            isValid = false;
        }
    }

    // Verificar e-mail e CPF
    if (emailInput) await checkEmail(emailInput);
    if (cpf) await checkCpf(cpfFormatado);

    // Prevenir o envio se não for válido
    if (!isValid) {
        event.preventDefault();
    }
});
