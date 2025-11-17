
let alunos = JSON.parse(localStorage.getItem("alunos")) || [];

const tabela = document.getElementById("tabela-corpo");
const form = document.getElementById("formulario");

let alunoEditando = null;

// Renderiza tabela ao carregar
renderizarTabela();

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const n1 = Number(document.getElementById("nota1").value);
    const n2 = Number(document.getElementById("nota2").value);

    if (!nome || n1 === "" || n2 === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const media = (n1 + n2) / 2;
    const status = media >= 6 ? "Aprovado" : "Reprovado";

    alunos.push({
        nome,
        nota1: n1,
        nota2: n2,
        media: media.toFixed(2),
        status
    });

    salvar();
    renderizarTabela();
    form.reset();
});

function renderizarTabela() {
    tabela.innerHTML = "";

    alunos.forEach((aluno, index) => {
        let tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.nota1}</td>
            <td>${aluno.nota2}</td>
            <td>${aluno.media}</td>
            <td class="${aluno.status === "Aprovado" ? "aprovado" : "reprovado"}">${aluno.status}</td>
            <td><button class="btn-edit" onclick="editarAluno(${index})">Editar</button></td>
        `;

        tabela.appendChild(tr);
    });
}

function salvar() {
    localStorage.setItem("alunos", JSON.stringify(alunos));
}

/* ===== EDIÇÃO ===== */

function editarAluno(index) {
    alunoEditando = index;

    document.getElementById("editNota1").value = alunos[index].nota1;
    document.getElementById("editNota2").value = alunos[index].nota2;

    document.getElementById("modal").style.display = "flex";
}

document.getElementById("cancelarEdicao").onclick = () => {
    document.getElementById("modal").style.display = "none";
};

document.getElementById("salvarEdicao").onclick = () => {
    const n1 = Number(document.getElementById("editNota1").value);
    const n2 = Number(document.getElementById("editNota2").value);

    const media = (n1 + n2) / 2;
    const status = media >= 6 ? "Aprovado" : "Reprovado";

    alunos[alunoEditando].nota1 = n1;
    alunos[alunoEditando].nota2 = n2;
    alunos[alunoEditando].media = media.toFixed(2);
    alunos[alunoEditando].status = status;

    salvar();
    renderizarTabela();

    document.getElementById("modal").style.display = "none";
};
