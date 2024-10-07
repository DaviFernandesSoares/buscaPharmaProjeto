
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id")
    const remedy = listaRemedios.find(item =>item.id == id)
    if(!remedy){
        const confirmacion = confirm("Produto não encontrado!!")
        if(confirmacion){
            window.location.href = "Medicamentos.html"
         }
    }else{
        const divPrincipal = document.querySelector(".prodDesc")
        divPrincipal.innerHTML = `
              <h1 class="titulo">${remedy.name}</h1>
        <br>
        <p class="paragraph">${remedy.description}</p>
        <div class="button-container">
            <a href="localizarRemedio.html?id=${remedy.id}"><button id="locateButton">Localizar Medicamento</button></a>
        </div>
    `
    }

  

