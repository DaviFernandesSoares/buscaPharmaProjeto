document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript carregado.');
    const form = document.getElementById('form');
    const usernameErroDiv = document.getElementById('username-erro');
    const tokenErroDiv = document.getElementById('token-erro');
    const senhaErroDiv = document.getElementById('senha-erro');
    const loginErroDiv = document.getElementById('login-erro');

    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Impede o comportamento padrão de envio do formulário

        let isValid = true;

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

        // Se o formulário for válido, faz o fetch
        if (isValid) {
            const formData = new FormData(form);
            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;  // Obtém o token CSRF

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                    'X-CSRFToken': csrftoken,  // Adiciona o token CSRF ao cabeçalho
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erro na resposta do servidor.');
                }
            })
            .then(data => {
                if (data.success) {
                    console.log("Redirecionando");
                    window.location.href = '/cadastro_admin/';  // URL corrigida para o caminho correto
                } else {
                    loginErroDiv.textContent = data.mensagem;
                    loginErroDiv.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Erro ao realizar o login:', error);
                loginErroDiv.textContent = 'Erro ao realizar o login. Tente novamente.';
                loginErroDiv.style.display = 'block';
            });
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
});
