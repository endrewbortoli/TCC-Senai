        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
        import { getFirestore, collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
        import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";

        // Configurações do Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyBjHux5Th122xDRmD35KsdjfTzrezHU8bY",
            authDomain: "fir-crud-56c52.firebaseapp.com",
            projectId: "fir-crud-56c52",
            storageBucket: "fir-crud-56c52.appspot.com",
            messagingSenderId: "906266562649",
            appId: "1:906266562649:web:55742c6c6b67449857e148",
            measurementId: "G-VN53GXMXM6"
        };

        // Inicializa o Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const storage = getStorage(app);

        // Função para adicionar feedback e upload de arquivo
        document.getElementById("submitData").addEventListener("click", async () => {
            const nomeos = document.getElementById("nomeos").value;
            const feedback = document.getElementById("feedback").value;
            const arquivo = document.getElementById("arquivo").files[0];

            if (nomeos && feedback) {
                try {
                    let fileUrl = '';
                    if (arquivo) {
                        // Cria uma referência ao arquivo no Firebase Storage
                        const fileRef = ref(storage, `feedback/${arquivo.name}`);

                        // Faz o upload do arquivo
                        await uploadBytes(fileRef, arquivo);

                        // Obtém a URL de download do arquivo
                        fileUrl = await getDownloadURL(fileRef);
                    }

                    // Adiciona o feedback ao Firestore
                    await addDoc(collection(db, "feedback"), {
                        nomeos: nomeos,
                        feedback: feedback,
                        arquivoUrl: fileUrl  // Armazena a URL do arquivo, se houver
                    });

                    alert("Feedback enviado com sucesso!");
                    window.location.href = "feedback.html";
                } catch (error) {
                    console.error("Erro ao adicionar feedback: ", error);
                    alert("Erro ao enviar feedback. Tente novamente.");
                }
            } else {
                alert("Por favor, preencha todos os campos!");
            }
        });

        // Função para preencher o select com as ordens de serviço finalizadas
        async function fetchFinalizedOrders() {
            const ordersRef = collection(db, "ordemServicos");
            const q = query(ordersRef, where("status", "==", "Finalizada"));
            const querySnapshot = await getDocs(q);

            const nomeosSelect = document.getElementById("nomeos");
            nomeosSelect.innerHTML = ''; // Limpa o select antes de adicionar

            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Selecione uma Ordem de Serviço Finalizada";
            nomeosSelect.appendChild(defaultOption);

            querySnapshot.forEach((doc) => {
                const orderData = doc.data();
                const option = document.createElement("option");
                option.value = doc.id;  // Utiliza o ID do documento como valor
                option.textContent = orderData.nome; // Supondo que o nome da ordem de serviço seja "nome"
                nomeosSelect.appendChild(option);
            });
        }

        // Chama a função para buscar as ordens de serviço finalizadas assim que a página carregar
        window.onload = fetchFinalizedOrders;

