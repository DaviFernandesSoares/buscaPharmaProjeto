document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const unitCodeInput = document.getElementById('unit-code');
    const usernameInput = document.getElementById('username');

    // Limita o Código da Unidade a 6 caracteres
    unitCodeInput.addEventListener('input', function () {
        if (this.value.length > 6) {
            this.value = this.value.slice(0, 6);
            alert("O Código da Unidade não pode ter mais de 6 caracteres.");
        }
    });

    // Habilita o campo de confirmação de senha após 8 dígitos na senha
    passwordInput.addEventListener('input', function () {
        // Limita a senha a 12 caracteres
        if (this.value.length > 12) {
            this.value = this.value.slice(0, 12);
            alert("A senha não pode ter mais de 12 caracteres.");
        }
        
        // Habilita o campo de confirmação se a senha tiver pelo menos 8 caracteres
        if (this.value.length >= 8) {
            confirmPasswordInput.disabled = false;
        } else {
            confirmPasswordInput.disabled = true;
            confirmPasswordInput.value = ''; // Limpa o campo se menos de 8 caracteres
        }

        // Verifica se a confirmação da senha está igual à senha
        checkPasswordMatch();
    });

    // Limita a confirmação de senha a 12 caracteres
    confirmPasswordInput.addEventListener('input', function () {
        if (this.value.length > 12) {
            this.value = this.value.slice(0, 12);
            alert("A confirmação de senha não pode ter mais de 12 caracteres.");
        }

        // Verifica se a confirmação da senha está igual
        checkPasswordMatch();
    });

    // Função para verificar se a confirmação da senha está igual
    function checkPasswordMatch() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity('As senhas não correspondem');
        } else {
            confirmPasswordInput.setCustomValidity(''); // Reseta a mensagem de erro
        }
    }

    // Função para mostrar/ocultar senhas
    document.getElementById('show-password').addEventListener('change', function () {
        const type = this.checked ? 'text' : 'password';
        passwordInput.type = type;
        confirmPasswordInput.type = type;
    });
});
