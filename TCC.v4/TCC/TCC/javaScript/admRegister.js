document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const unitCodeInput = document.getElementById('unit-code');
    const usernameInput = document.getElementById('username');
    const registerButton = document.querySelector('.btn'); 

    unitCodeInput.addEventListener('input', function () {
        if (this.value.length > 6) {
            this.value = this.value.slice(0, 6);
            alert("O Código da Unidade não pode ter mais de 6 caracteres.");
        }
    });

    passwordInput.addEventListener('input', function () {
        if (this.value.length > 12) {
            this.value = this.value.slice(0, 12);
            alert("A senha não pode ter mais de 12 caracteres.");
        }

        if (this.value.length >= 8) {
            confirmPasswordInput.disabled = false;
        } else {
            confirmPasswordInput.disabled = true;
            confirmPasswordInput.value = '';
        }
        checkPasswordMatch();
    });

    confirmPasswordInput.addEventListener('input', function () {
        if (this.value.length > 12) {
            this.value = this.value.slice(0, 12);
            alert("A confirmação de senha não pode ter mais de 12 caracteres.");
        }
        checkPasswordMatch();
    });

    function checkPasswordMatch() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity('As senhas não correspondem');
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
    }

    document.getElementById('show-password').addEventListener('change', function () {
        const type = this.checked ? 'text' : 'password';
        passwordInput.type = type;
        confirmPasswordInput.type = type;
    });

    // Armazenar as credenciais no localStorage após o registro
    registerButton.addEventListener('click', function (event) {
        event.preventDefault(); // Impede o envio do formulário

        // Valida os campos aqui...
        if (passwordInput.value !== confirmPasswordInput.value) {
            alert("As senhas não correspondem!");
            return;
        }

        const adminCredentials = {
            unitCode: unitCodeInput.value,
            username: usernameInput.value,
            password: passwordInput.value,
        };

        // Armazenando as credenciais em localStorage
        localStorage.setItem('adminCredentials', JSON.stringify(adminCredentials));

        alert('Cadastro realizado com sucesso!');
        
        // Redirecionar para a página de login
        window.location.href = 'admin_login.html'; // Mude para a página de login
    });
});
