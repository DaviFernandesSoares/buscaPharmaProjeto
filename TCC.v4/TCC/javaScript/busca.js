const tableData = [
    { Nome: "Advil", Principio_ativo: "Ibuprofeno" },
    { Nome: "Ritalina", Principio_ativo: "Metilfenidato" },
    { Nome: "Dipirona", Principio_ativo: "Dipirona Sódica" },
    // Adicione mais itens conforme necessário
];

// Variável fornecida pelo back-end
let totalPages = 20; // Exemplo: o back-end fornece a quantidade total de páginas
const itemsPerPage = 30; // Quantidade de itens por página
const maxVisiblePages = 5; // Número máximo de páginas visíveis antes das reticências
let currentPage = 1;

const tableBody = document.getElementById('table-body');
const searchInput = document.getElementById('search-bar');
const paginationContainer = document.createElement('div');
paginationContainer.classList.add('pagination');
document.body.appendChild(paginationContainer); // Adiciona os controles de paginação ao final do body

function createRow(rowData) {
    return `
        <tr>
            <td>${rowData.Nome}</td>
            <td>${rowData.Principio_ativo}</td>
        </tr>
    `;
}

function renderTable(data, page = 1) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = data.slice(startIndex, endIndex);
    tableBody.innerHTML = pageData.map(row => createRow(row)).join('');
    renderPagination();
}

function renderPagination() {
    paginationContainer.innerHTML = ''; // Limpa a paginação anterior

    // Adiciona o botão "1" (sempre aparece)
    const firstButton = document.createElement('button');
    firstButton.innerText = '1';
    firstButton.classList.add('page-btn');
    if (currentPage === 1) {
        firstButton.classList.add('active'); // Acende em azul se estiver na página 1
    }
    firstButton.addEventListener('click', function () {
        currentPage = 1;
        renderTable(tableData, currentPage);
    });
    paginationContainer.appendChild(firstButton);

    // Adiciona reticências se necessário
    if (currentPage >= 4) {
        const ellipsis = document.createElement('span');
        ellipsis.innerText = '...';
        paginationContainer.appendChild(ellipsis);
    }

    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
        // Se o total de páginas for menor ou igual ao máximo visível
        startPage = 2;
        endPage = totalPages;
    } else {
        // Se o total de páginas for maior que o máximo visível
        startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        // Ajusta startPage se necessário
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(2, endPage - maxVisiblePages + 1);
        }
    }

    // Adiciona botões de página
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.classList.add('page-btn');
        if (i === currentPage) {
            pageButton.classList.add('active'); // Acende em azul se estiver na página atual
        }
        pageButton.addEventListener('click', function () {
            currentPage = i;
            renderTable(tableData, currentPage);
        });
        paginationContainer.appendChild(pageButton);
    }

    // Adiciona reticências se necessário
    if (endPage < totalPages - 1) {
        const ellipsis = document.createElement('span');
        ellipsis.innerText = '...';
        paginationContainer.appendChild(ellipsis);
    }

    // Adiciona o botão da última página
    if (endPage < totalPages) {
        const lastButton = document.createElement('button');
        lastButton.innerText = totalPages;
        lastButton.classList.add('page-btn');
        if (currentPage === totalPages) {
            lastButton.classList.add('active'); // Acende em azul se estiver na última página
        }
        lastButton.addEventListener('click', function () {
            currentPage = totalPages;
            renderTable(tableData, currentPage);
        });
        paginationContainer.appendChild(lastButton);
    }
}

// Inicializa a tabela com todos os dados
renderTable(tableData, currentPage);

// Filtro de busca de medicamentos
searchInput.addEventListener('keyup', function () {
    const filter = this.value.toLowerCase();
    const filteredData = tableData.filter(item =>
        item.Nome.toLowerCase().includes(filter) ||
        item.Principio_ativo.toLowerCase().includes(filter)
    );
    currentPage = 1; // Reseta para a primeira página
    renderTable(filteredData, currentPage);
});
