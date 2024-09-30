const tableData = [
    {
        Nome: "Advil muito foda pra caralho",
        Principio_ativo: "Alguma coisa não sei o nome pica",
    },
    {
        Nome: "Ritalina",
        Principio_ativo: "Alguma coisa não sei o nome",
    },
    {
        Nome: "Dipirona",
        Principio_ativo: "Alguma coisa",
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
