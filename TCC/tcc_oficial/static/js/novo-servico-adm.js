    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
    import { query, where } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
    import {
      getFirestore,
      addDoc,
      collection,
      getDocs,
      doc,
      deleteDoc,
      updateDoc,
    } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";

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
    const analytics = getAnalytics(app);

// Função para buscar e preencher os usuários de "Manutenção"
const preencherUsuariosManutencao = async () => {
  const atribuidoSelect = document.getElementById("atribuido");

  try {
    // Consultar os usuários com tipoUsuario "Manutenção"
    const q = query(collection(db, "users"), where("tipoUsuario", "==", "Trabalhador"));
    const querySnapshot = await getDocs(q);

    // Adicionar cada usuário ao campo de seleção
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      const option = document.createElement("option");
      option.value = userData.nome;
      option.textContent = userData.nome;
      atribuidoSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao buscar usuários de Manutenção: ", error);
  }
};

// Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", preencherUsuariosManutencao);


// Função para gerar o número ID aleatório de 4 casas
function generateRandomID() {
  return Math.floor(1000 + Math.random() * 9000); // Gera um número aleatório entre 1000 e 9999
}

// Função para adicionar ordem de serviço
document.getElementById('submitData').addEventListener('click', async () => {
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  const criador = document.getElementById("criador").value;
  const status = document.getElementById("status").value; 
  const ambiente = document.getElementById("ambiente").value;
  const tipoSolicitacao = document.getElementById("tipoSolicitacao").value;
  const blocoManutencao = document.getElementById("blocoManutenção").value;
  const atribuicao = document.getElementById("atribuido").value;
  const dataPedido = document.getElementById("dataPedido").value;
  const dataLimite = document.getElementById("dataLimite").value;
  const prioridade = document.getElementById("prioridade").value;
  
  const numeroID = generateRandomID(); // Gerar número ID
  const dataEncerrado = ''; // Inicializa como vazio

  if (!descricao || !criador || !ambiente || !tipoSolicitacao || !dataPedido || !dataLimite || !prioridade || !blocoManutencao) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "ordemServicos"), {
      nome: nome,
      descricao: descricao,
      criador: criador,
      status: status,
      ambiente: ambiente,
      tipoSolicitacao: tipoSolicitacao,
      blocoManutencao: blocoManutencao, // Adiciona o bloco de manutenção
      atribuicao: atribuicao, // Adiciona o atribuído a
      dataPedido: dataPedido,
      dataLimite: dataLimite,
      prioridade: prioridade,
      numeroID: numeroID, // Envia o número ID
      dataEncerrado: dataEncerrado, // Envia o valor vazio
    });

    alert("Ordem de serviço criada com sucesso!");
    window.location.href = "{% url 'geral_dashboard' %}"; // Redirecionamento para dashboard

    document.querySelector(".form-container").reset(); // Limpa o formulário
  } catch (e) {
    console.error("Erro ao adicionar documento: ", e);
  }
});