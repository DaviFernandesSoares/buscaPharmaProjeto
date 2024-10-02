document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const usernameErroDiv = document.getElementById('username-erro');
    const tokenErroDiv = document.getElementById('username-erro');
    const senhaErroDiv = document.getElementById('senha-erro');
    const loginErroDiv = document.getElementById('login-erro');

    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Impede o comportamento padrão de envio do formulário

        let isValid = true;

        // Validação do email
        const username = document.getElementById('username').value;
        usernameErroDiv.textContent = '';
        usernameErroDiv.style.display = 'none';
        if (!username) {
            usernameErroDiv.textContent = 'O email é obrigatório.';
            usernameErroDiv.style.display = 'block';
            isValid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(username)) {
                usernameErroDiv.textContent = 'Formato de Email Inválido.';
                usernameErroDiv.style.display = 'block'; // Exibir mensagem de erro
                isValid = false;
            }
        }

        const token = document.getElementById('token').value;
        tokenErroDiv.textContent = '';
        tokenErroDiv.style.display = 'none';
        if (!token) {
            tokenErroDiv.textContent = 'O email é obrigatório.';
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

            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',  // Indica que é uma requisição AJAX
                    'Accept': 'application/json',  // Espera resposta em JSON
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();  // Tenta transformar a resposta em JSON
                } else {
                    throw new Error('Erro na resposta do servidor.');
                }
            })
            .then(data => {
                if (!data.success) {
                    loginErroDiv.textContent = data.mensagem;
                    loginErroDiv.style.display = 'block';
                } else {
                    window.location.href = '/home/';  // Redirecionar para a página home
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
