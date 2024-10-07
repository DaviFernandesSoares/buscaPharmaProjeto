function validateFields () {

}
function isEmailValid () {
    const email = document.getElementById("email").value;
    if (!email) {
        return false
    }
    return validateEmail(email)
}
function validateEmail (email) {
    return /\S+@\S+\.\S+/.test(email)
}

function isPasswordValid () {

}
function toggleEmailErrors () {

}
function toggleEmailErrorsDisable() {

}
// Mostrar senha
document.getElementById('show-password').addEventListener('change', function () {
    const passwordField = document.getElementById('password');

    // Checa se o checkbox de mostrar senha está marcado
    if (this.checked) {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
});
