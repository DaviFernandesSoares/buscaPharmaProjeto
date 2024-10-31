function desativarBotao(){
    const botao = document.getElementById('btn-registrar')
    botao.disabled = true;
}
function ativarBotao(){
    const botao = document.getElementById('btn-registrar')
    botao.disabled = false;
}

document.getElementById('form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio do formulário até que as validações sejam feitas
    let isValid = true; // Variável para verificar se houve erro
    desativarBotao();
    // Validação do username
    const usernameInput = document.getElementById('username').value;
    const usernameError = document.getElementById('username-error');
    usernameError.textContent = ''; // Limpa mensagem de erro anterior
    usernameError.style.display = 'none'; // Esconde mensagem de erro

    if (!usernameInput) {
        usernameError.textContent = 'O username é obrigatório.';
        usernameError.style.display = 'block'; // Exibir mensagem de erro
        isValid = false;
        ativarBotao()
    }

    const nome_completo = document.getElementById('nome_completo').value;
    const erro_nome = document.getElementById('nome-completo-error')
    if (!nome_completo) {
        erro_nome.textContent = 'O nome completo é obrigatório.';
        erro_nome.style.display = 'block'; // Exibir mensagem de erro
        isValid = false;
        ativarBotao()
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
        ativarBotao()
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
        ativarBotao()
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
