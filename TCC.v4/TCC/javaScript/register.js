document.addEventListener('DOMContentLoaded', function () {
    // Função para mostrar/ocultar senhas
    function togglePasswordVisibility() {
        const passwordField = document.getElementById('password');
        const confirmPasswordField = document.getElementById('confirm-password');

        if (this.checked) {
            passwordField.type = 'text';
            confirmPasswordField.type = 'text';
        } else {
            passwordField.type = 'password';
            confirmPasswordField.type = 'password';
        }
    }

    // Função para preencher DDDs
    function populateDDDSelect() {
        const dddList = [11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 
                         31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 
                         49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 
                         71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 
                         91, 92, 93, 94, 95, 96, 97, 98, 99];
        const dddSelect = document.getElementById('ddd-select');
        dddList.forEach(ddd => {
            const option = document.createElement('option');
            option.value = ddd;
            option.textContent = ddd;
            dddSelect.appendChild(option);
        });
    }
    // Adiciona eventos
    document.getElementById('show-password').addEventListener('change', togglePasswordVisibility);

    // Chama a função para preencher o select ao carregar o script
    populateDDDSelect();

    // Função para formatar o Telefone
    function formatPhone(input) {
        const cleaned = input.replace(/\D/g, '');
        const limited = cleaned.slice(0, 9);
        let formatted = '';
        if (limited.length > 0) {
            formatted += limited.slice(0, 5);
        }
        if (limited.length > 5) {
            formatted += '-' + limited.slice(5, 9);
        }
        return formatted;
    }

    // Seleciona o campo Telefone e adiciona o evento de input
    const phoneInput = document.getElementById('phone-input'); // Certifique-se de que o ID seja correto
    phoneInput.addEventListener('input', function () {
        this.value = formatPhone(this.value); // Aplica a formatação
        if (this.value.length > 10) {
            this.value = this.value.slice(0, 9); // Limita a 9 caracteres
        }
    });

    // Função para formatar o CPF
    function formatCPF(input) {
        const cleaned = input.replace(/\D/g, '');
        const limited = cleaned.slice(0, 11);
        let formatted = '';
        if (limited.length > 0) {
            formatted += limited.slice(0, 3);
        }
        if (limited.length > 3) {
            formatted += '.' + limited.slice(3, 6);
        }
        if (limited.length > 6) {
            formatted += '.' + limited.slice(6, 9);
        }
        if (limited.length > 9) {
            formatted += '-' + limited.slice(9, 11);
        }
        return formatted;
    }

    // Seleciona o campo CPF e adiciona o evento de input
    const cpfInput = document.getElementById('cpf-input');
    cpfInput.addEventListener('input', function () {
        this.value = formatCPF(this.value); // Aplica a formatação
        if (this.value.length > 14) {
            this.value = this.value.slice(0, 14); // Limita a 14 caracteres (incluindo pontos e hífen)
        }
    });

    // Seleciona os campos de senha e confirmação
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    // Inicialmente desabilitar o campo de confirmação
    confirmPasswordInput.disabled = true;

    // Função para verificar se a confirmação da senha está igual
    function checkPasswordMatch() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity('As senhas não correspondem');
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
        confirmPasswordInput.reportValidity("Senha não conferem"); // Exibe a mensagem de erro
    }

    // Adiciona evento de input para o campo de senha
    passwordInput.addEventListener('input', function () {
        // Limita a senha a 12 caracteres
        if (this.value.length < 12) {
            this.value = this.value.slice(0, 12); // Limita a 12 caracteres
        }
        // Habilita o campo de confirmação de senha após 8 dígitos na senha
        passwordInput.addEventListener('input', function () {
            // Limita a senha a 12 caracteres
            if (this.value.length > 12) {
                this.value = this.value.slice(0, 12);
                alert("A senha não pode ter mais de 12 caracteres.");
            }

        checkPasswordMatch(); // Verifica correspondência
    });
        
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

    // Adiciona evento de foco para habilitar o campo de confirmação
    confirmPasswordInput.addEventListener('focus', function () {
        if (passwordInput.value.length < 8) {
            alert('Digite pelo menos 8 caracteres na senha antes de confirmar.'); // Mensagem de aviso
            this.blur(); // Remove o foco
        }
    });
    
    // Limita a confirmação de senha a 12 caracteres
    confirmPasswordInput.addEventListener('input', function () {
        if (this.value.length > 12) {
            this.value = this.value.slice(0, 12);
            alert("A senha não pode ter mais de 12 caracteres.");
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

    // Adiciona evento de input para o campo de confirmação
    confirmPasswordInput.addEventListener('input', function () {
        if (this.value.length > 12) {
            this.value = this.value.slice(0, 12); // Limita a 12 caracteres
        }
        checkPasswordMatch(); // Verifica correspondência
    });
});







    

