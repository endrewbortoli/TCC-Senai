    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
    import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

    // Inicialização do Firebase
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

    // Obtendo a ordem de serviço do ID passado via URL
    const urlParams = new URLSearchParams(window.location.search);
    const ordemId = urlParams.get('id');

    if (ordemId) {
        carregarOrdem(ordemId);
    } else {
        console.error("Nenhuma ordem de serviço foi selecionada.");
    }

    async function carregarOrdem(id) {
        try {
            const docRef = doc(db, "ordemServicos", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const servico = docSnap.data();
                document.getElementById('ambiente').textContent = servico.ambiente;
                document.getElementById('criador').textContent = servico.criador;
                document.getElementById('dataLimite').textContent = servico.dataLimite;
                document.getElementById('dataPedido').textContent = servico.dataPedido;
                document.getElementById('descricao').textContent = servico.descricao;
                document.getElementById('prioridade').textContent = servico.prioridade;
                document.getElementById('status').textContent = servico.status;
                document.getElementById('tipoSolicitacao').textContent = servico.tipoSolicitacao;
            } else {
                console.log("Nenhum dado encontrado!");
            }
        } catch (error) {
            console.error("Erro ao carregar a ordem de serviço:", error);
        }
    }
