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


    // Função para adicionar ordem de serviço
    document.getElementById("submitData").addEventListener("click", async () => {
      const nome = document.getElementById("nome").value;
      const descricao = document.getElementById("descricao").value;
      const criador = document.getElementById("criador").value;
      const atribuido = document.getElementById("atribuido").value;
      const status = document.getElementById("status").value;
      const ambiente = document.getElementById("ambiente").value;
      const tipoSolicitacao = document.getElementById("tipoSolicitacao").value;
      const dataLimite = document.getElementById("dataLimite").value;
      const dataPedido = document.getElementById("dataPedido").value;
      const prioridade = document.getElementById("prioridade").value;

      try {
        await addDoc(collection(db, "ordemServicos"), {
          nome,
          descricao,
          criador,
          atribuido,
          status,
          ambiente,
          tipoSolicitacao,
          dataLimite,
          dataPedido,
          prioridade,
        });
        window.alert("Ordem de Serviço Adicionada");
                window.location.href = "{% url 'servico' %}";

      } catch (error) {
        console.error("Erro ao adicionar ordem de serviço: ", error);
      }
    });


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


