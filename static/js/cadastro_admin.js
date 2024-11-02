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


document.getElementById('form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio do formulário até que as validações sejam feitas
    let isValid = true; // Variável para verificar se houve erro
    desativarBotao();

    // Validação do username
    const usernameInput = document.getElementById('username').value;
    const usernameError = document.getElementById('username-error');
    usernameError.textContent = '';
    usernameError.style.display = 'none';

    if (!usernameInput) {
        usernameError.textContent = 'O username é obrigatório.';
        usernameError.style.display = 'block';
        isValid = false;
        ativarBotao();
    }

    // Validação do nome completo
    const nome_completo = document.getElementById('nome_completo').value;
    const erro_nome = document.getElementById('nome-completo-error');
    erro_nome.textContent = '';
    erro_nome.style.display = 'none';

    if (!nome_completo) {
        erro_nome.textContent = 'O nome completo é obrigatório.';
        erro_nome.style.display = 'block';
        isValid = false;
        ativarBotao();
    }

    // Validação da senha
    const passwordInput = document.getElementById('password').value;
    const passwordError = document.getElementById('password-error');
    passwordError.textContent = '';
    passwordError.style.display = 'none';

    if (passwordInput.length < 8) {
        passwordError.textContent = 'A senha deve ter pelo menos 8 caracteres.';
        passwordError.style.display = 'block';
        isValid = false;
        ativarBotao();
    }

    // Validação da confirmação da senha
    const confirmPasswordInput = document.getElementById('confirm-password').value;
    const confirmPasswordError = document.getElementById('confirm-password-error');
    confirmPasswordError.textContent = '';
    confirmPasswordError.style.display = 'none';

    if (confirmPasswordInput !== passwordInput) {
        confirmPasswordError.textContent = 'As senhas não coincidem.';
        confirmPasswordError.style.display = 'block';
        isValid = false;
        ativarBotao();
    }

    // Enviar formulário se for válido
    if (isValid) {
        document.getElementById('form').submit();
    }
});

