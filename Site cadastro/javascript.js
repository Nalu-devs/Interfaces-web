const API_URL = "http://localhost:8081/interfaces-web/Site cadastro/produtos.php";

function todos(pesquisa = "") {
    let url = API_URL;
    if (pesquisa) {
        url += "?pesquisa=" + encodeURIComponent(pesquisa);
    }
    const tbody = document.querySelector("#tabela tbody");
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
                                <td><button onclick='editar(${JSON.stringify(produtos)})'>Editar</button>
                                                    <button onclick='excluir(${produtos.ID})'>Excluir</button></td>`;
                tbody.appendChild(tr);
            });
        })
    
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
    const preco = document.getElementById("valor").value;
    const estoque = document.getElementById("estoque").value;
    const acao = document.getElementById("acao").value;

    const payload = { ID: id, NOME: nome, DESCRICAO: descricao, VALOR: preco, ESTOQUE: estoque, ACAO: acao };
console.log(payload)
    if (id) {
        console.log("put")
        await fetch(API_URL, { method: "PUT", body: JSON.stringify(payload) });
    }
    else {
        await fetch(API_URL, { method: "POST", body: JSON.stringify(payload) }).then(resp => {
            resp.json()
        }).then(data => console.log(data));
        console.log("tttt")
    }

    limpar();
    todos();
}

function editar(produtos) {
    document.getElementById("id").value = produtos.ID;
    document.getElementById("nome").value = produtos.NOME;
    document.getElementById("descricao").value = produtos.DESCRICAO;
    document.getElementById("valor").value = produtos.PRECO;
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
    document.getElementById("valor").value = "";
    document.getElementById("estoque").value = "";
    document.getElementById("acao").value = "";
}

todos();