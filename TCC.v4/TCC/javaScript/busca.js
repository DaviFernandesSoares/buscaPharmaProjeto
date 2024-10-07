const remedios = document.getElementById("tableRemedios")
listaRemedios.forEach((item)=>{
    const tr = document.createElement("tr")
    tr.innerHTML = `<td class="td"><a href="produto.html?id=${item.id}">${item.name}</a></td><td>${item.description}</td>`
    remedios.appendChild(tr);
})