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

    // Função para carregar serviços atribuídos
    const carregarServicosAtribuidos = async (nomeUsuario) => {
        const tabelaServicos = document.getElementById("tabelaServicos");
        tabelaServicos.innerHTML = ""; // Limpa a tabela antes de adicionar os novos dados

        try {
            // Consulta para buscar serviços com o campo "atribuido" igual ao nome do usuário
            const q = query(collection(db, "ordemServicos"), where("atribuido", "==", nomeUsuario));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                tabelaServicos.innerHTML = `<tr><td colspan="5">Nenhum serviço atribuído.</td></tr>`;
                return;
            }

            // Preenche a tabela com os dados filtrados
            querySnapshot.forEach((doc) => {
                const servico = doc.data();
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${servico.descricao}</td>
                    <td>${servico.dataLimite}</td>
                    <td>${servico.prioridade}</td>
                    <td>${servico.status}</td>
                    <td><button class="ver-mais" onclick="window.location.href='detalhes.html?id=${doc.id}'">VER MAIS</button></td>
                `;
                tabelaServicos.appendChild(tr);
            });
        } catch (error) {
            console.error("Erro ao carregar os serviços atribuídos: ", error);
            tabelaServicos.innerHTML = `<tr><td colspan="5">Erro ao carregar serviços.</td></tr>`;
        }
    };

    // Função para pesquisar ordens de serviço
    window.pesquisar = function() { 
        const queryInput = document.getElementById('searchInput').value.toLowerCase();
        const tabelaServicos = document.getElementById("tabelaServicos");
        const linhas = tabelaServicos.getElementsByTagName("tr");

        for (let i = 0; i < linhas.length; i++) {
            const cols = linhas[i].getElementsByTagName("td");
            let found = false;

            for (let j = 0; j < cols.length - 1; j++) {
                if (cols[j]) {
                    const textoColuna = cols[j].textContent.toLowerCase();
                    if (textoColuna.includes(queryInput)) {
                        found = true;
                        break;
                    }
                }
            }

            linhas[i].style.display = found ? "" : "none";
        }
    };

    // Função de logout
    const logout = () => {
        sessionStorage.clear();
        window.location.href = "login.html";
    };

    const nomeUsuario = sessionStorage.getItem('nome');
    if (nomeUsuario) carregarServicosAtribuidos(nomeUsuario);
