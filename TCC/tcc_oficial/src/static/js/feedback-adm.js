        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
        import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

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

        async function loadFeedback() {
            const feedbackCollection = collection(db, "feedback");
            const feedbackSnapshot = await getDocs(feedbackCollection);
            const feedbackList = feedbackSnapshot.docs.map(doc => doc.data());

            const feedbackTableBody = document.getElementById("feedbackTableBody");
            feedbackList.forEach(feedback => {
                const row = document.createElement("tr");
            row.innerHTML = `
                <td>${feedback.criador || 'Anônimo'}</td>
                <td>${feedback.descricao}</td>
                <td>${feedback.avaliacao}</td>
                <td>${feedback.videoUrl ? `<a href="${feedback.videoUrl}" download>Baixar Vídeo</a>` : 'N/A'}</td>
                <td>${feedback.imageUrl ? `<a href="${feedback.imageUrl}" download>Baixar Imagem</a>` : 'N/A'}</td>
                <td>${new Date().toLocaleString()}</td>
            `;
                feedbackTableBody.appendChild(row);
            });
        }

        // Chama a função para carregar o feedback ao carregar a página
        window.onload = loadFeedback;
