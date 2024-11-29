import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, query, where, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
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

const eyeOpenImg = "{% static 'img/eye-open.png' %}";
const closedEyesImg = "{% static 'img/closeicon.webp' %}";
const admDashboard = "/adm/admdashboard"; // Caminho correto para a página de administração

document.getElementById("loginBtn").addEventListener("click", async (event) => {
    event.preventDefault(); // Impede que o formulário seja enviado (e a página seja recarregada)
    
    const nif = document.getElementById("nif").value;
    const senha = document.getElementById("senha").value;

    try {
        const userQuery = query(
            collection(db, "users"),
            where("nif", "==", nif),
            where("senha", "==", senha)
        );

        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                const tipoUsuario = userData.tipoUsuario;
                const nomeDoUsuario = userData.nome;

                // Salvando as informações no sessionStorage
                sessionStorage.setItem('userLogged', 'true');
                sessionStorage.setItem('tipoUsuario', tipoUsuario);
                sessionStorage.setItem('nome', nomeDoUsuario);

                // Verificando o tipo de usuário e redirecionando para a página correspondente
                console.log("Tipo de usuário:", tipoUsuario);  // Adicionando log para depuração

                window.alert("Login bem-sucedido");

                // Aqui você pode adicionar o redirecionamento dependendo do tipo de usuário
                if (tipoUsuario === "Administrador") {
                    window.location.href = "/adm/admdashboard";  // Redirecionamento para a página de administrador
                } else if (tipoUsuario === "Geral") {
                    window.location.href = "/geral/dashboard";  // Redirecionamento para o dashboard geral
                } else if (tipoUsuario === "Trabalhador") {
                    window.location.href = "/manutencao/dashboard";  // Redirecionamento para o painel de manutenção
                } else {
                    window.alert("Tipo de usuário desconhecido");
                    window.location.href = "/";  // Redirecionamento padrão caso o tipo não seja reconhecido
                }
            });
        } else {
            window.alert("NIF ou Senha inválidos");
        }
    } catch (error) {
        console.error("Erro ao fazer login: ", error);
    }
});

// Mostrar ou ocultar a senha
const showPasswordBtn = document.getElementById("showPasswordBtn");
const toggleIcon = document.getElementById("toggleIcon");

showPasswordBtn.addEventListener("click", () => {
    const senhaInput = document.getElementById("senha");
    const isPasswordVisible = senhaInput.type === "text";
    senhaInput.type = isPasswordVisible ? "password" : "text";

    // Alternar entre ícones
    toggleIcon.src = isPasswordVisible ? eyeOpenImg : closedEyesImg;
});