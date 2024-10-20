document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript carregado.');
    const form = document.getElementById('form');
    const usernameErroDiv = document.getElementById('username-erro');
    const tokenErroDiv = document.getElementById('token-erro');
    const senhaErroDiv = document.getElementById('senha-erro');
    const backendErroDiv = document.getElementById('login-erro'); // Para mostrar erros do backend

    form.addEventListener('submit', function(event) {
        let isValid = true;

        // Limpar mensagem de erro do backend ao submeter
        backendErroDiv.textContent = '';
        backendErroDiv.style.display = 'none';

        // Validação do username
        const username = document.getElementById('username').value;
        usernameErroDiv.textContent = '';
        usernameErroDiv.style.display = 'none';
        if (!username) {
            usernameErroDiv.textContent = 'O nome de usuário é obrigatório.';
            usernameErroDiv.style.display = 'block';
            isValid = false;
        }

        // Validação do token
        const token = document.getElementById('token').value;
        tokenErroDiv.textContent = '';
        tokenErroDiv.style.display = 'none';
        if (!token) {
            tokenErroDiv.textContent = 'O token é obrigatório.';
            tokenErroDiv.style.display = 'block';
            isValid = false;
        }

        // Validação da senha
        const senha = document.getElementById('password').value;
        senhaErroDiv.textContent = '';
        senhaErroDiv.style.display = 'none';
        if (!senha) {
            senhaErroDiv.textContent = 'A senha é obrigatória.';
            senhaErroDiv.style.display = 'block';
            isValid = false;
        }

        // Se o formulário não for válido, impede o envio
        if (!isValid) {
            event.preventDefault();  // Impede o comportamento padrão de envio do formulário
        }
    });

    // Mostrar/ocultar senha
    const showPasswordCheckbox = document.getElementById('show-password');
    const passwordField = document.getElementById('password');

    showPasswordCheckbox.addEventListener('change', function() {
        if (showPasswordCheckbox.checked) {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    });

    // Mostrar erro do backend, se houver
    if (backendErroDiv.textContent.trim() !== '') {
        backendErroDiv.style.display = 'block';
    } else {
        backendErroDiv.style.display = 'none';
    }
});
