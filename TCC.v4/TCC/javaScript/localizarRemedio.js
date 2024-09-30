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
