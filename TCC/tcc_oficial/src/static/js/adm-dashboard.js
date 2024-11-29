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
                document.getElementById("modalAmbiente").innerText = ordemServico.ambiente;
                document.getElementById("modalCriador").innerText = ordemServico.criador;
                document.getElementById("modalDataLimite").innerText = ordemServico.dataLimite;
                document.getElementById("modalDataPedido").innerText = ordemServico.dataPedido;
                document.getElementById("modalDescricao").innerText = ordemServico.descricao;
                document.getElementById("modalPrioridade").innerText = ordemServico.prioridade;
                document.getElementById("modalTipoSolicitacao").innerText = ordemServico.tipoSolicitacao;

                // Exibe o modal
                const modal = document.getElementById("detalhesModal");
                modal.style.display = "block";

                // Evento para fechar o modal
                document.querySelector(".close").onclick = () => {
                    modal.style.display = "none";
                };
            });
        }

        loadOrdensServicos(); // Chama a função para carregar as ordens de serviço na página
