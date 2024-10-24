const cardsAgenda = document.getElementById("cards");
listaCards.forEach((item) => {
  const div = document.createElement("div");
  div.classList.add("proced");
  div.innerHTML = `
        <h2>${item.events}</h2>
        <h3>${item.locality}</h3>
        <h3>${item.date}</h3>
        <h3>${item.hours}</h3>
        <div class="button-container">
        <button style="color: white" class="reagendar-btn">Reagendar horário</button>
        <button class="cancel-btn">Cancelar Agendamento</button>
        </div>
    `;
  cardsAgenda.appendChild(div);

  const reagendar = document.querySelectorAll(".reagendar-btn");
  reagendar.forEach((e) => {
    e.addEventListener("click", () => {
        const deleteModal = document.querySelector(".modal");
        if(deleteModal){
            deleteModal.remove();
        }
      const modal = document.createElement("div");
      modal.classList.add("modal");

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });
      modal.innerHTML = `<form class="modal-form" style="color: #f3f3f3">
                    <h1>Reagendar Horário</h1>
                    <label for="data">Data:</label>
                    <input type="date" id="data" name="data" required>
                    <label for="hora">Hora:</label>
                    <input type="time" id="hora" name="hora" required>
                    <div class="button-container">
                     <button type="submit" class="confirmar">Reagendar Horário</button>
                      </div>
                        </form>`;

      document.body.appendChild(modal);

      const msg = modal.querySelector(".confirmar");
      msg.addEventListener('click', (e)=>{
        e.preventDefault();
        modal.remove();

        alert(`
        Confirmação de Agendamento para Retirada de Medicamento:

        Confirmamos seu agendamento para a retirada do medicamento 
        por favor acompanhe seus agendamentos pelo site
        ou pelo email, se tiver alguma alteração, nos lhe informamos.
        Agradecemos a sua confiança e esperamos vê-lo(a) em breve.
    `)
      })
    });
  });
  const apaga = document.querySelector(".cancel-btn");

apaga.addEventListener('click', ()=>{
    confirm("Deseja cancelar o agendamento?")
        if(confirm){            
    div.remove();
        }
    });
});


