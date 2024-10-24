        const userOnline = true;

        const statusIndicator = document.querySelectorAll(".status-indicator");
        console.log(statusIndicator);
        if (userOnline) {
        statusIndicator.forEach((e) => {
            e.classList.remove("offline");
            e.classList.add("online");
        });
        } else {
        statusIndicator.forEach((e) => {
            e.classList.remove("online");
            e.classList.add("offline");
        });
        }

        const edit = document.querySelectorAll(".edit-button");
        edit.forEach((e) => {
        e.addEventListener("click", () => {
            const modal = document.createElement("div");
            modal.classList.add("modal");

            modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.remove();
            }
            });
            modal.innerHTML = `<form class="modal-form">
                            <h1>Editando Perfil</h1>
                            <label>Nome Completo:
                            <input type="text" id="name" name="nome" required placeholder:"Confirme seu nome:"/>
                            </label>
                            <label>Email:
                            <input type="email" id="email" name="nome" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" placeholder:"Confirme seu email:"/>
                            </label>
                            <label>Telefone:
                            <input type="number" id="phone" name="nome" required pattern="\d{10,11}" placeholder:"Confirme seu telefone:"/>
                            </label>
                            <label>Nova Senha:
                            <input type="password" id="password" name="nome" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}" placeholder:"Digite sua nova senha:"/>
                            </label>
                            <label>Confirmar Nova Senha:
                            <input type="password" id="password" name="nome" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}" placeholder:"Confirme sua nova senha:"/>
                            </label>
                            <div class="button-container">
                            <button type="submit">Editar</button>
                            </div>
                                </form>`;

            document.body.appendChild(modal);
        });
        });
