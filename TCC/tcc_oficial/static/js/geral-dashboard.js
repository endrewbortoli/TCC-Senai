     import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
      import {
        getFirestore,
        collection,
        query,
        where,
        getDocs,
      } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

      const firebaseConfig = {
        apiKey: "AIzaSyBjHux5Th122xDRmD35KsdjfTzrezHU8bY", // Substitua por sua chave de API real
        authDomain: "fir-crud-56c52.firebaseapp.com",
        projectId: "fir-crud-56c52",
        storageBucket: "fir-crud-56c52.appspot.com",
        messagingSenderId: "906266562649",
        appId: "1:906266562649:web:55742c6c6b67449857e148",
        measurementId: "G-VN53GXMXM6",
      };

      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

      const nomeUsuario = sessionStorage.getItem("nome");

      if (!nomeUsuario) {
        document.querySelector("#userGreeting").textContent =
          "Bem-vindo de volta, Anônimo!";
      } else {
        document.querySelector(
          "#userGreeting"
        ).textContent = `Bem-vindo de volta, ${nomeUsuario}!`;
        loadOrdensServico(nomeUsuario);
        loadOrdensFinalizadas(nomeUsuario); // Carrega os serviços finalizados
      }

      async function loadOrdensServico(nomeUsuario) {
        const q = query(
          collection(db, "ordemServicos"),
          where("criador", "==", nomeUsuario)
        );

        try {
          const querySnapshot = await getDocs(q);
          const osTable = document.querySelector("#osTable tbody");
          osTable.innerHTML = "";

          querySnapshot.forEach((doc) => {
            const osData = doc.data();
            const row = document.createElement("tr");
            const atribuido = osData.atribuido
              ? osData.atribuido
              : "Não atribuído";
            const status = osData.status ? osData.status : "Em analise";

            row.innerHTML = `
                    <td>${osData.descricao}</td>
                    <td>${atribuido}</td>
                    <td>${status}</td>
                    <td>${osData.ambiente}</td>
                    <td>${osData.dataPedido}</td>
                    <td>${osData.dataLimite}</td>
                    <td>
                        <button onclick="editOS('${doc.id}')">
                            <img src="../../assets/img/pen.png" style="height: 20px;">
                        </button>
                        <button onclick="deleteOS('${doc.id}')">
                            <img src="../../assets/img/closeicon.webp" style="height: 20px;">
                        </button>
                    </td>
                `;
            osTable.appendChild(row);
          });
        } catch (error) {
          console.error("Erro ao buscar ordens de serviço:", error);
        }
      }

      async function loadOrdensFinalizadas(nomeUsuario) {
        const q = query(
          collection(db, "ordemServicos"),
          where("criador", "==", nomeUsuario),
          where("status", "==", "Finalizado")
        );

        try {
          const querySnapshot = await getDocs(q);
          const osFinalizadasTable = document.querySelector(
            "#osFinalizadasTable tbody"
          );
          const noFinalizadosMessage = document.getElementById("noFinalizados");
          osFinalizadasTable.innerHTML = "";

          if (querySnapshot.empty) {
            noFinalizadosMessage.style.display = "block"; // Mostra a mensagem se não houver serviços finalizados
          } else {
            noFinalizadosMessage.style.display = "none"; // Esconde a mensagem caso existam serviços finalizados

            querySnapshot.forEach((doc) => {
              const osData = doc.data();
              const row = document.createElement("tr");

              row.innerHTML = `
                        <td>${osData.descricao}</td>
                        <td>${osData.atribuido}</td>
                        <td>${osData.status}</td>
                        <td>${osData.ambiente}</td>
                        <td>${osData.dataPedido}</td>
                        <td>${osData.dataLimite}</td>
                    `;
              osFinalizadasTable.appendChild(row);
            });
          }
        } catch (error) {
          console.error("Erro ao buscar ordens de serviço finalizadas:", error);
        }
      }

      function logout() {
        sessionStorage.clear();
        window.location.href = "../../login/login.html";
      }

      function editOS(id) {
        window.location.href = `editarServico.html?id=${id}`;
      }

      function deleteOS(id) {
        if (confirm("Tem certeza que deseja excluir esta ordem de serviço?")) {
          deleteDoc(doc(db, "ordemServicos", id))
            .then(() => {
              alert("Ordem de serviço excluída com sucesso!");
              location.reload();
            })
            .catch((error) => {
              console.error("Erro ao excluir a ordem de serviço:", error);
            });
        }
      }