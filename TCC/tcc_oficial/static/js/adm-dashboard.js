import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, getDocs, collection, query, where, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBjHux5Th122xDRmD35KsdjfTzrezHU8bY",
    authDomain: "fir-crud-56c52.firebaseapp.com",
    projectId: "fir-crud-56c52",
    storageBucket: "fir-crud-56c52.appspot.com",
    messagingSenderId: "906266562649",
    appId: "1:906266562649:web:55742c6c6b67449857e148",
    measurementId: "G-VN53GXMXM6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para preencher a tabela com dados de Firestore filtrados por status
async function loadOrdensServicos() {
    const q = query(collection(db, "ordemServicos"), where("status", "in", ["Não aprovado", "Em andamento", "Esperando Confirmação"]));
    const querySnapshot = await getDocs(q);
    const tableBody = document.getElementById("ordemServicosTableBody");

    tableBody.innerHTML = ""; // Limpa o conteúdo da tabela

    querySnapshot.forEach((doc) => {
        const ordemServico = doc.data();
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${ordemServico.nome || "Sem nome"}</td>
            <td>${ordemServico.criador || "Desconhecido"}</td>
            <td>${ordemServico.dataLimite || "Sem data"}</td>
            <td>${ordemServico.prioridade || "Normal"}</td>
            <td>${ordemServico.status || "Indefinido"}</td>
            <td><button class="verMaisBtn" data-id="${doc.id}">VER MAIS</button></td>
        `;

        tableBody.appendChild(row);
    });

    // Adiciona evento de clique aos botões "VER MAIS"
    document.querySelectorAll(".verMaisBtn").forEach((button) => {
        button.addEventListener("click", (event) => {
            const ordemId = event.target.getAttribute("data-id");
            showOrdemServicoDetails(ordemId);
        });
    });
}

// Função para exibir os detalhes no modal
async function showOrdemServicoDetails(ordemId) {
    const docRef = collection(db, "ordemServicos");
    const docSnapshot = await getDocs(query(docRef, where("__name__", "==", ordemId)));

    docSnapshot.forEach((doc) => {
        const ordemServico = doc.data();

        // Preenche o modal com os detalhes da ordem de serviço
        document.getElementById("modalAmbiente").textContent = ordemServico.ambiente || "Sem ambiente";
        document.getElementById("modalCriador").textContent = ordemServico.criador || "Desconhecido";
        document.getElementById("modalDataLimite").textContent = ordemServico.dataLimite || "Sem data";
        document.getElementById("modalDataPedido").textContent = ordemServico.dataPedido || "Sem data";
        document.getElementById("modalDescricao").textContent = ordemServico.descricao || "Sem descrição";
        document.getElementById("modalPrioridade").textContent = ordemServico.prioridade || "Normal";
        document.getElementById("modalTipoSolicitacao").textContent = ordemServico.tipoSolicitacao || "Sem tipo";

        // Configura o status selecionado no select
        const modalStatusSelect = document.getElementById("modalStatusSelect");
        modalStatusSelect.value = ordemServico.status || "Indefinido";

        // Exibe o modal
        document.getElementById("detalhesModal").style.display = "block";
    });

// Adiciona evento ao botão de salvar status
document.getElementById("saveStatusButton").onclick = async function() {
const newStatus = document.getElementById("modalStatusSelect").value;

// Adiciona um alerta de confirmação
const confirmChange = window.confirm("Você realmente deseja alterar o status para '" + newStatus + "'?");

if (confirmChange) {
    await updateOrdensServicosStatus(ordemId, newStatus);
}
};

}

// Função para atualizar o status da ordem de serviço no Firestore
async function updateOrdensServicosStatus(ordemId, newStatus) {
    const docRef = doc(db, "ordemServicos", ordemId);
    await updateDoc(docRef, {
        status: newStatus
    });
    // Fechar o modal após a atualização
    document.getElementById("detalhesModal").style.display = "none";
    // Recarregar as ordens de serviço para refletir a mudança
    loadOrdensServicos();
    countOrdensServicos();
}

// Função para contar ordens de serviço e atualizar contadores
async function countOrdensServicos() {
    const statusCounts = {
        "Não aprovado": 0,
        "Em andamento": 0,
        "Esperando Confirmação": 0
    };

    const q = query(collection(db, "ordemServicos"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        const ordemServico = doc.data();
        if (statusCounts[ordemServico.status] !== undefined) {
            statusCounts[ordemServico.status]++;
        }
    });

    document.getElementById("naoAtribuidosCount").textContent = statusCounts["Não aprovado"];
    document.getElementById("emAndamentoCount").textContent = statusCounts["Em andamento"];
    document.getElementById("esperandoConfirmacaoCount").textContent = statusCounts["Esperando Confirmação"];
}

// Chama as funções ao carregar a página
loadOrdensServicos();
countOrdensServicos();

// Função para fechar o modal
document.querySelector(".close").onclick = function() {
    document.getElementById("detalhesModal").style.display = "none";
};

// Fecha o modal se o usuário clicar fora dele
window.onclick = function(event) {
    if (event.target == document.getElementById("detalhesModal")) {
        document.getElementById("detalhesModal").style.display = "none";
    }
};
