// INICIALIZAÇÃO
window.onload = function () {
    // Carrega links salvos
    const links = JSON.parse(localStorage.getItem("links")) || [];
    links.forEach(l => criarItem(l.descricao, l.endereco));
    // Carrega tema salvo
    const tema = localStorage.getItem("tema") || "light";
    document.documentElement.setAttribute("data-bs-theme", tema);
    atualizarIconeTema(tema);
};

// ADICIONAR LINK
function adicionarLink() {
    const descricao = document.getElementById("descricao").value;
    const endereco = document.getElementById("endereco").value;
    const alerta = document.getElementById("alerta");

    if (descricao === "" || endereco === "") {
        alerta.classList.remove("d-none");
        return;
    }

    alerta.classList.add("d-none");

    criarItem(descricao, endereco);
    salvarLink(descricao, endereco);

    document.getElementById("descricao").value = "";
    document.getElementById("endereco").value = "";
}

// CRIAR ITEM NA LISTA
function criarItem(descricao, endereco) {
    const item = document.createElement("li");
    item.classList.add(
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center"
    );

    const link = document.createElement("a");
    link.href = endereco;
    link.target = "_blank";
    link.innerHTML = `<i class="bi bi-link-45deg"></i> ${descricao}`;

    const btnRemover = document.createElement("button");
    btnRemover.classList.add("btn", "btn-sm", "btn-danger");
    btnRemover.innerHTML = `<i class="bi bi-trash"></i>`;

    btnRemover.onclick = () => {
        item.remove();
        removerLink(descricao);
    };

    item.append(link, btnRemover);
    document.getElementById("listarLinks").append(item);
}

// SALVAR NO LOCALSTORAGE
function salvarLink(descricao, endereco) {
    const links = JSON.parse(localStorage.getItem("links")) || [];
    links.push({ descricao, endereco });
    localStorage.setItem("links", JSON.stringify(links));
}

// REMOVER DO LOCALSTORAGE
function removerLink(descricao) {
    let links = JSON.parse(localStorage.getItem("links")) || [];
    links = links.filter(l => l.descricao !== descricao);
    localStorage.setItem("links", JSON.stringify(links));
}

// DARK MODE TOGGLE
function toggleTheme() {
    const atual = document.documentElement.getAttribute("data-bs-theme");
    const novo = atual === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-bs-theme", novo);
    localStorage.setItem("tema", novo);

    atualizarIconeTema(novo);
}

// ATUALIZAR ÍCONE DO TEMA
function atualizarIconeTema(tema) {
    const icon = document.getElementById("themeIcon");
    icon.className = tema === "dark"
        ? "bi bi-sun"
        : "bi bi-moon";
}