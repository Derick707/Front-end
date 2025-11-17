// Carrega dados do localStorage ao iniciar
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

const tabela = document.getElementById("tabela-corpo");
const form = document.getElementById("formulario");

// Atualiza a tabela quando a página abre
renderizarTabela();

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let n1 = Number(document.getElementById("nota1").value);
    let n2 = Number(document.getElementById("nota2").value);

    if (!nome || n1 === "" || n2 === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // Calcula média
    let media = (n1 + n2) / 2;
    let status = media >= 6 ? "Aprovado" : "Reprovado";

    // Cria objeto aluno
    let aluno = {
        nome: nome,
        nota1: n1,
        nota2: n2,
        media: media.toFixed(2),
        status: status
    };

    // Salva na lista
    alunos.push(aluno);

    // Salva no localStorage
    localStorage.setItem("alunos", JSON.stringify(alunos));

    // Atualiza tabela
    renderizarTabela();

    // Limpa campos
    form.reset();
});

// Função que exibe todos os alunos na tabela
function renderizarTabela() {
    tabela.innerHTML = "";

    alunos.forEach(aluno => {
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.nota1}</td>
            <td>${aluno.nota2}</td>
            <td>${aluno.media}</td>
            <td class="${aluno.status === 'Aprovado' ? 'aprovado' : 'reprovado'}">
                ${aluno.status}
            </td>
        `;

        tabela.appendChild(tr);
    });
}
