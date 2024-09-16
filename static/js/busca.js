const tableData = [
    {
        Nome: "Advil",
        Principio_ativo: "Alguma coisa não sei o nome",
        quantidade: "30 mg",
        tarja: "vermelha"
    },
    {
        Nome: "Ritalina",
        Principio_ativo: "Alguma coisa não sei o nome",
        quantidade: "200 KG",
        tarja: "amarela"
    },
    {
        Nome: "Dipirona",
        Principio_ativo: "Alguma coisa",
        quantidade: "500 mg",
        tarja: "verde"
    },
    // Adicione mais objetos aqui com os dados para outras linhas
];

const tableBody = document.getElementById('table-body');
const searchInput = document.getElementById('search-bar');

function createRow(rowData) {
    return `
        <tr>
            <td>${rowData.Nome}</td>
            <td>${rowData.Principio_ativo}</td>
            <td>${rowData.quantidade}</td>
            <td><span class="tarja ${rowData.tarja}">${rowData.tarja.charAt(0).toUpperCase() + rowData.tarja.slice(1)}</span></td>
        </tr>
    `;
}

function renderTable(data) {
    tableBody.innerHTML = data.map(row => createRow(row)).join('');
}

// Inicializa a tabela com todos os dados
renderTable(tableData);

searchInput.addEventListener('keyup', function () {
    const filter = this.value.toLowerCase();
    const filteredData = tableData.filter(item =>
        item.Nome.toLowerCase().includes(filter) ||
        item.Principio_ativo.toLowerCase().includes(filter)
    );
    renderTable(filteredData);
});
