document.addEventListener('DOMContentLoaded', function () {
    const usernameInput = document.querySelector('.input-box input[type="text"]');
    const passwordInput = document.getElementById('password');
    const showPasswordCheckbox = document.getElementById('show-password');
    const loginButton = document.querySelector('.btn');

    // Função para mostrar/ocultar senhas
    showPasswordCheckbox.addEventListener('change', function () {
        const type = this.checked ? 'text' : 'password';
        passwordInput.type = type;
    });

    // Função para validar a senha
    function isPasswordValid() {
        const password = passwordInput.value;
        if (!password) {
            alert("A senha é obrigatória.");
            return false;
        }
        return true; // Você pode adicionar mais validações, como comprimento mínimo
    }

    // Adiciona o evento de clique ao botão de login
    loginButton.addEventListener('click', function (event) {
        event.preventDefault(); // Evita o envio do formulário

        // Verifica se a senha é válida
        if (!isPasswordValid()) {
            return; // Se a senha não for válida, não continua
        }

        const username = usernameInput.value;
        const password = passwordInput.value;

        // Recuperar credenciais do localStorage
        const storedCredentials = JSON.parse(localStorage.getItem('adminCredentials'));

        // Verifica se as credenciais correspondem
        if (storedCredentials && storedCredentials.username === username && storedCredentials.password === password) {
            alert('Seja Bem Vindo, Logado com sucesso!');
            // Redirecionar para a página inicial
            window.location.href = 'home_admin.html'; // Mude para a página que deseja redirecionar
        } else {
            alert('Nome de usuário ou senha incorretos. Por favor, tente novamente.');
        }
    });
});
