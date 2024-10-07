// Abrir o modal
let modal = document.getElementById("myModal");
let btn = document.getElementById("openModal");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

document.getElementById("agendamentoForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;
    const hora = document.getElementById("hora").value;
    
    console.log(`Agendado: Nome: ${nome}, Data: ${data}, Hora: ${hora}`);
    alert("Agendamento realizado!");

    modal.style.display = "none";
});
