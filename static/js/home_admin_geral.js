function procurarAdmin() {
    const conteudoPesquisa = document.getElementById('search-bar').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    let existencia = false;

    // Remove mensagem "Nenhum administrador encontrado" existente, se houver
    const mensagemNenhum = document.querySelector('.nenhum');
    if (mensagemNenhum) {
        mensagemNenhum.remove();
    }

    // Mostra todos os cards se o campo de pesquisa estiver vazio
    if (conteudoPesquisa === '') {
        cards.forEach(card => {
            card.style.display = ''; // Mostra todos os cards
        });
        return;
    }

    // Realiza a pesquisa
    cards.forEach(card => {
        const username = card.querySelector('h1').textContent.toLowerCase();
        if (username.includes(conteudoPesquisa)) {
            card.style.display = '';
            existencia = true;
        } else {
            card.style.display = 'none';
        }
    });

    // Mostra a mensagem "Nenhum administrador encontrado" se nenhum card for encontrado
    if (!existencia) {
        const secao = document.getElementById('secao');
        secao.style.alignItems = 'center';
        secao.style.display = '';
        const mensagem = document.createElement('p');
        mensagem.classList.add('nenhum');
        mensagem.textContent = 'Nenhum administrador encontrado.';
        secao.appendChild(mensagem);
    }
}
