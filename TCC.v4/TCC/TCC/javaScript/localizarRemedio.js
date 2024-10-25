document.addEventListener('DOMContentLoaded', () => {
    fetch('http://127.0.0.1:5000/farmacias')
        .then(response => response.json())
        .then(data => {
            const list = document.querySelector('.farmacias ul');
            list.innerHTML = ''; // Limpar lista existente
            data.forEach(farmacia => {
                const listItem = document.createElement('li');
                listItem.textContent = `${farmacia.nome} - ${farmacia.endereco}`;
                list.appendChild(listItem);
            });
        })
        .catch(error => console.error('Erro ao carregar dados:', error));
});

    // Função para mudar o src do iframe
    const listItems = document.querySelectorAll('.farmacias li');
    const map = document.getElementById('map');

    listItems.forEach(item => {
        item.addEventListener('click', function() {
            const newSrc = this.getAttribute('data-map');
            map.src = newSrc;
        });
    });

    
  const agendar = document.querySelectorAll(".agendar-btn");
    agendar.forEach((e) => {
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
      modal.innerHTML = `<form class="modal-form">
                    <h1>Agendar Horário</h1>
                    <label for="data">Data:</label>
                    <input type="date" id="data" name="data" required>
                    <label for="hora">Hora:</label>
                    <input type="time" id="hora" name="hora" required>
                    <div class="button-container">
                     <button type="submit" class="confirmar">Agendar Horário</button>
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
    `);
    
    window.location.href = "../Users/Agendamentos.html";
      })
    });
});
