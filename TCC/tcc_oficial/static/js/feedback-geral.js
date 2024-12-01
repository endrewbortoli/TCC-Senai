        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
        import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
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

        // Preenche o campo "Solicitante" com o nome do usuário
        const nomeUsuario = sessionStorage.getItem('nome');

        if (!nomeUsuario) {
            console.warn("Nenhum nome de usuário encontrado no sessionStorage.");
            document.querySelector('#userGreeting').textContent = "Bem-vindo de volta, Anônimo!";
        } else {
            document.querySelector('#userGreeting').textContent = `${nomeUsuario}`;
        }

        // Função para enviar feedback
        document.getElementById('submitFeedback').addEventListener('click', async () => {
            const descricao = document.getElementById("descricao").value;
            const videoUpload = document.getElementById("videoUpload").files[0];
            const imageUpload = document.getElementById("imageUpload").files[0];
            const avaliacao = document.getElementById("avaliacao").value;

            if (!descricao || !avaliacao) {
                alert("Por favor, preencha todos os campos obrigatórios.");
                return;
            }

            try {
                const feedbackData = {
                    descricao: descricao,
                    videoUrl: videoUpload ? URL.createObjectURL(videoUpload) : null, // Armazenar URL do vídeo temporariamente
                    imageUrl: imageUpload ? URL.createObjectURL(imageUpload) : null, // Armazenar URL da imagem temporariamente
                    avaliacao: avaliacao,
                    criador: nomeUsuario || "Anônimo", // Preenche o nome do usuário
                };

                const docRef = await addDoc(collection(db, "feedback"), feedbackData);
                alert("Feedback enviado com sucesso!");
                window.location.href = "../../public/geral/geraldashboard.html";
            } catch (e) {
                console.error("Erro ao adicionar documento: ", e);
                alert("Erro ao enviar feedback.");
            }
        });
