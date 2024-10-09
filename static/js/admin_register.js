document.getElementById('form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio do formulário até que as validações sejam feitas
    let isValid = true; // Variável para verificar se houve erro

    // Validação do username
    const usernameInput = document.getElementById('username').value;
    const usernameError = document.getElementById('username-error');
    usernameError.textContent = ''; // Limpa mensagem de erro anterior
    usernameError.style.display = 'none'; // Esconde mensagem de erro

    if (!usernameInput) {
        usernameError.textContent = 'O username é obrigatório.';
        usernameError.style.display = 'block'; // Exibir mensagem de erro
        isValid = false;
    }

    // Validação do token
    const tokenInput = document.getElementById('token').value;
    const tokenError = document.getElementById('token-error');
    tokenError.textContent = ''; // Limpa mensagem de erro anterior
    tokenError.style.display = 'none'; // Esconde mensagem de erro

    if (!tokenInput) {
        tokenError.textContent = 'O token da unidade é obrigatório.';
        tokenError.style.display = 'block'; // Exibir mensagem de erro
        isValid = false;
    }

    // Validação da senha
    const passwordInput = document.getElementById('password').value;
    const passwordError = document.getElementById('password-error');
    passwordError.textContent = ''; // Limpa mensagem de erro anterior
    passwordError.style.display = 'none'; // Esconde mensagem de erro

    if (passwordInput.length < 8) {
        passwordError.textContent = 'A senha deve ter pelo menos 8 caracteres.';
        passwordError.style.display = 'block'; // Exibir mensagem de erro
        isValid = false;
    }

    // Validação da confirmação da senha
    const confirmPasswordInput = document.getElementById('confirm-password').value;
    const confirmPasswordError = document.getElementById('confirm-password-error');
    confirmPasswordError.textContent = ''; // Limpa mensagem de erro anterior
    confirmPasswordError.style.display = 'none'; // Esconde mensagem de erro

    if (confirmPasswordInput !== passwordInput) {
        confirmPasswordError.textContent = 'As senhas não coincidem.';
        confirmPasswordError.style.display = 'block'; // Exibir mensagem de erro
        isValid = false;
    }

    // Se não houver erro, enviar o formulário
    if (isValid) {
        try {
            // Exemplo de verificação adicional, se necessário
            const response = await fetch(`/verificar_existencia/?username=${usernameInput}`);
            const data = await response.json();
            if (data.username_existe) {
                usernameError.textContent = 'Este username já está cadastrado.';
                usernameError.style.display = 'block'; // Exibir mensagem de erro
                isValid = false;
            }
        } catch (error) {
            console.error('Erro ao verificar o username:', error);
        }

        if (isValid) {
            event.target.submit(); // Enviar o formulário se tudo estiver válido
        }
    }
});

// Mostrar senha e confirmar senha
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
