import { query, where } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Função para buscar e preencher os usuários de "Manutenção"
const preencherUsuariosManutencao = async () => {
  const atribuidoSelect = document.getElementById("atribuido");

  try {
    // Consultar os usuários com nível "Manutenção"
    const q = query(collection(db, "users"), where("nivel", "==", "Manutenção"));
    const querySnapshot = await getDocs(q);

    // Adicionar cada usuário ao campo de seleção
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      const option = document.createElement("option");
      option.value = userData.nome; // ou use outro campo, como o ID do usuário
      option.textContent = userData.nome;
      atribuidoSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao buscar usuários de Manutenção: ", error);
  }
};

// Chamar a função ao carregar a página
document.addEventListener("DOMContentLoaded", preencherUsuariosManutencao);
