// Função de logout
function logout() {
    sessionStorage.removeItem('userLogged');
    sessionStorage.removeItem('tipoUsuario');
    sessionStorage.removeItem('nome'); // Se você também estiver armazenando o nome do usuário
    console.log("Usuário deslogado");
    window.location.href = "/"; // Redireciona para a página de login
}

// Verifica se o usuário está logado
document.addEventListener("DOMContentLoaded", function() {
    if (sessionStorage.getItem('userLogged') === "true") {
        console.log("Usuário logado");

        const nomeUsuario = sessionStorage.getItem('nome'); // Nome do usuário logado
        const currentPath = window.location.pathname; // Caminho da URL atual
        const tipoUsuario = sessionStorage.getItem('tipoUsuario'); // Tipo de usuário salvo no sessionStorage

        console.log("Nome do usuário:", nomeUsuario);
        console.log("Tipo de usuário:", tipoUsuario);
        console.log("Caminho atual:", currentPath);

        // Verifica se a variável 'userData' foi salva corretamente no localStorage
        const userData = localStorage.getItem('userData');
        if (userData) {
            console.log('Dados do usuário:', userData);
        } else {
            console.log('userData não foi definido corretamente');
        }

        // Aqui você pode adicionar lógicas adicionais de redirecionamento ou comportamentos
        // Por exemplo, pode redirecionar para páginas específicas com base no tipo de usuário
        if (tipoUsuario === "Administrador") {
            // Se for um administrador, redireciona para o painel do admin
            if (!currentPath.includes("/adm/")) {
                window.location.href = "/adm/admdashboard";
            }
        } else if (tipoUsuario === "Geral") {
            // Se for um usuário do tipo "Geral", redireciona para o painel geral
            if (!currentPath.includes("/geral/")) {
                window.location.href = "/geral/geraldashboard";
            }
        } else if (tipoUsuario === "Trabalhador") {
            // Se for um trabalhador, redireciona para o painel de manutenção
            if (!currentPath.includes("/manutencao/")) {
                window.location.href = "/manutencao/manutencaodashboard";
            }
        }
    } else {
        // Se o usuário não estiver logado, redireciona para a página de login
        console.log("Usuário não logado, redirecionando para o login.");
        window.location.href = "/"; // Redireciona para a página de login
    }
});
