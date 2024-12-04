    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
    import {
        getFirestore,
        getDocs,
        doc,
        deleteDoc,
        updateDoc,
        collection
    } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

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
    let currentEditingId; // Variável para armazenar o ID da Ordem de Serviço que está sendo editada

    const penImage = "{% static 'img/pen.png' %}";
    const closeImage = "{% static 'img/closeicon.webp' %}";
    const searchImage = "{% static 'img/search-icon.png' %}";

    async function loadOrdensServico() {
        const querySnapshot = await getDocs(collection(db, "ordemServicos"));
        const osTable = document.querySelector("#osTable tbody");
        osTable.innerHTML = ""; // Limpa a tabela antes de recarregar

        querySnapshot.forEach((doc) => {
            const osData = doc.data();
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${osData.nome}</td>
            <td>${osData.descricao}</td>
            <td>${osData.criador}</td>
            <td>${osData.atribuido}</td>
            <td>${osData.status}</td>
            <td>${osData.ambiente}</td>
            <td>${osData.dataPedido}</td>
            <td>${osData.dataLimite}</td>
            <td>${osData.prioridade}</td>
            <td>
                <button onclick="editOS('${doc.id}', '${doc.nome}', '${osData.descricao}', '${osData.criador}', '${osData.atribuido}', '${osData.status}', '${osData.ambiente}', '${osData.dataPedido}', '${osData.dataLimite}', '${osData.prioridade}')">
                    <i class="fas fa-times"></i>
                </button>
                <button onclick="deleteOS('${doc.id}')">
                    <img src="closeImage">
                </button>
                <button onclick="" class="see-more">
                    <img src="searchimage">
                </button>
            </td>
        `;
                    osTable.appendChild(row);
        });
    }

    window.editOS = (id, nome, descricao, criador, atribuido, status, ambiente, dataPedido, dataLimite, prioridade) => {
        currentEditingId = id; // Armazena o ID da ordem de serviço sendo editada
        document.getElementById("editOrdemId").value = id; // Define o ID no campo de texto (se necessário)
        document.getElementById("editNome").value = nome;
        document.getElementById("editDescricao").value = descricao;
        document.getElementById("editCriador").value = criador;
        document.getElementById("editAtribuido").value = atribuido;
        document.getElementById("editStatus").value = status;
        document.getElementById("editAmbiente").value = ambiente;
        document.getElementById("editDataPedido").value = dataPedido;
        document.getElementById("editDataLimite").value = dataLimite;
        document.getElementById("editPrioridade").value = prioridade; // Aqui, você deve garantir que esse ID exista no HTML
        document.getElementById("ordemServicoModal").style.display = "block";
    };

    window.closeOrdemServicoModal = () => {
        document.getElementById("ordemServicoModal").style.display = "none";
    };

    document.getElementById("ordemServicoForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const nome = document.getElementById("editNome").value;
        const descricao = document.getElementById("editDescricao").value;
        const criador = document.getElementById("editCriador").value;
        const atribuido = document.getElementById("editAtribuido").value;
        const status = document.getElementById("editStatus").value;
        const ambiente = document.getElementById("editAmbiente").value;
        const dataPedido = document.getElementById("editDataPedido").value;
        const dataLimite = document.getElementById("editDataLimite").value;
        const prioridade = document.getElementById("editPrioridade").value;

        // Atualiza o documento no Firestore
        await updateDoc(doc(db, "ordemServicos", currentEditingId), {
            nome: nome,
            descricao: descricao,
            criador: criador,
            atribuido: atribuido,
            status: status,
            ambiente: ambiente,
            dataPedido: dataPedido,
            dataLimite: dataLimite,
            prioridade: prioridade,
        });

        closeOrdemServicoModal();
        loadOrdensServico();
    });

    window.deleteOS = async (id) => {
        const confirmation = confirm("Tem certeza que deseja excluir esta Ordem de Serviço?");
        if (confirmation) {
            await deleteDoc(doc(db, "ordemServicos", id));
            loadOrdensServico();
        }
    };

    window.onload = loadOrdensServico;

    function logout() {
        console.log("Logout realizado");
    }
