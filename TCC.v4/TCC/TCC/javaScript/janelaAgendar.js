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

function confirmarAgendamento() {
    const mensagem = 
    `
        Confirmação de Agendamento para Retirada de Medicamento:

        Confirmamos seu agendamento para a retirada do medicamento 
        por favor acompanhe seus agendamentos pelo site
        ou pelo email, se tiver alguma alteração, nos lhe informamos.
        Agradecemos a sua confiança e esperamos vê-lo(a) em breve.
    `;
    alert(mensagem);
}
