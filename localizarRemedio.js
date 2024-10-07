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