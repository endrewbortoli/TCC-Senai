      import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
      import {
        getFirestore,
        getDocs,
        doc,
        deleteDoc,
        updateDoc,
        collection,
      } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

      const firebaseConfig = {
        apiKey: "AIzaSyBjHux5Th122xDRmD35KsdjfTzrezHU8bY",
        authDomain: "fir-crud-56c52.firebaseapp.com",
        projectId: "fir-crud-56c52",
        storageBucket: "fir-crud-56c52",
        messagingSenderId: "906266562649",
        appId: "1:906266562649:web:55742c6c6b67449857e148",
        measurementId: "G-VN53GXMXM6",
      };

      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

      // Função para carregar usuários do Firestore e exibi-los na tabela
      async function loadUsers() {
        const querySnapshot = await getDocs(collection(db, "users"));
        const userTable = document.querySelector("#userTable tbody");
        userTable.innerHTML = ""; // Limpa a tabela antes de recarregar

        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const row = document.createElement("tr");

          row.innerHTML = `
                    <td>${userData.nif}</td>
                    <td>${userData.nome}</td>
                    <td>${userData.email}</td>
                    <td>${userData.senha}</td>
                    <td>${userData.tipoUsuario}</td>
                    <td>
                        <button class= "edit-btn" onclick="openModal('${doc.id}', '${userData.nif}', '${userData.nome}', '${userData.email}', '${userData.senha}', '${userData.tipoUsuario}')"><img src="../../assets/img/pen.png"></button>
                        <button class= "delete-btn" onclick="deleteOS('${doc.id}')"><img src="../../assets/img/closeicon.webp"></button>
                    </td>
                `;
          userTable.appendChild(row);
        });
      }

      // Função para excluir usuário
      async function deleteOS(id) {
        await deleteDoc(doc(db, "users", id));
        loadUsers(); // Recarregar os dados após a exclusão
      }

      // Função para abrir o modal de edição
      function openModal(id, nif, nome, email, senha, tipoUsuario) {
        const modal = document.getElementById("editModal");
        document.getElementById("editNif").value = nif;
        document.getElementById("editName").value = nome;
        document.getElementById("editEmail").value = email;
        document.getElementById("editPassword").value = senha;
        document.getElementById("editLevel").value = tipoUsuario;
        modal.style.display = "block";

        // Salvar no Firestore
        const form = document.getElementById("editForm");
        form.onsubmit = async (event) => {
          event.preventDefault();
          const newNif = document.getElementById("editNif").value;
          const newName = document.getElementById("editName").value;
          const newEmail = document.getElementById("editEmail").value;
          const newPassword = document.getElementById("editPassword").value;
          const newLevel = document.getElementById("editLevel").value;

          const userRef = doc(db, "users", id);
          await updateDoc(userRef, {
            nif: newNif,
            nome: newName,
            email: newEmail,
            senha: newPassword,
            tipoUsuario: newLevel,
          });
          loadUsers(); // Recarregar os dados após a edição
          closeModal(); // Fechar o modal
        };
      }

      // Fechar o modal
      function closeModal() {
        const modal = document.getElementById("editModal");
        modal.style.display = "none";
      }

      // Fechar o modal ao clicar fora dele
      window.onclick = function (event) {
        const modal = document.getElementById("editModal");
        if (event.target === modal) {
          closeModal();
        }
      };

      // Filtrando os usuários na tabela conforme a pesquisa
      document.querySelector(".search-bar").addEventListener("input", async function () {
        const searchTerm = this.value.toLowerCase();
        const querySnapshot = await getDocs(collection(db, "users"));
        const userTable = document.querySelector("#userTable tbody");
        userTable.innerHTML = "";

        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (
            userData.nif.toLowerCase().includes(searchTerm) ||
            userData.nome.toLowerCase().includes(searchTerm) ||
            userData.email.toLowerCase().includes(searchTerm)
          ) {
            const row = document.createElement("tr");
            row.innerHTML = `
                    <td>${userData.nif}</td>
                    <td>${userData.nome}</td>
                    <td>${userData.email}</td>
                    <td>${userData.senha}</td>
                    <td>${userData.tipoUsuario}</td>
                    <td>
                        <button class= "edit-btn" onclick="openModal('${doc.id}', '${userData.nif}', '${userData.nome}', '${userData.email}', '${userData.senha}', '${userData.tipoUsuario}')"><img src="../../assets/pen.png"></button>
                        <button class= "delete-btn" onclick="deleteOS('${doc.id}')"><img src="../../assets/closeicon.webp"></button>
                    </td>
                `;
            userTable.appendChild(row);
          }
        });
      });

      loadUsers();
