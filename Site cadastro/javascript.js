function todos(pesquisa = "") {
    let url = API_URL;
    if (pesquisa) {
        url += "?pesquisa=" + encodeURIComponent(pesquisa);
    }
    fetch(url)
        .then(resposta => resposta.json())
        .then(dados => {
            console.log(dados)
            dados.forEach(produtos => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                                <td>${produtos.ID}</td>
                                <td>${produtos.NOME}</td>
                                <td>${produtos.DESCRICAO}</td>
                                <td>${produtos.PRECO}</td>
                                <td>${produtos.ESTOQUE}</td>
                                <td>${produtos.ACAO == 1 ? "Comprar" : "Não comprar"}</td>
                                <td>
                                    <button onclick='editar(${JSON.stringify(produtos)})'>Editar</button>
                                    <button onclick='excluir(${produtos.ID})'Excluir</button>
                                </td>`;
                tbody.appendChild(tr);
            });
        })
    const tbody = document.querySelector("#tabela tbody");
    tbody.innerHTML = "";
}

function pesquisar() {
    const valor = document.getElementById("pesquisar").value;
    todos(valor);
}

async function salvar() {
    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const preco = document.getElementById("preco").value;
    const estoque = document.getElementById("estoque").value;
    const acao = document.getElementById("acao").value;

    const payload = { ID: id, NOME: nome, DESCRICAO: descricao, PRECO: preco, ESTOQUE: estoque, ACAO: acao };

    if (id) {
        await fetch(API_URL, { method: "PUT", body: JSON.stringify(payload) });
    }
    else {
        await fetch(API_URL, { method: "POST", body: JSON.stringify(payload) });
    }

    limpar();
    todos();
}

function editar(produtos) {
    document.getElementById("id").value = produtos.ID;
    document.getElementById("nome").value = produtos.NOME;
    document.getElementById("descricao").value = produtos.DESCRICAO;
    document.getElementById("preco").value = produtos.PRECO;
    document.getElementById("estoque").value = produtos.ESTOQUE;
    document.getElementById("acao").value = produtos.ACAO;
}

async function excluir(id) {
    if (confirm("Deseja excluir este produto?")) {
        await fetch(API_URL + "?id=" + id, { method: "DELETE" });
        todos();
    }
}

function limpar() {
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("estoque").value = "";
    document.getElementById("acao").value = "";
}

todos();