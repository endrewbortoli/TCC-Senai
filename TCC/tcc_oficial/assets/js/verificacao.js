    function logout() {
    sessionStorage.removeItem('userLogged');
    sessionStorage.removeItem('tipoUsuario');
    window.location.href = "../../index.html"; // Redireciona para a página de login
}

if (sessionStorage.getItem('userLogged') === "true") {
    const tipoUsuario = sessionStorage.getItem('tipoUsuario');
    const currentPath = window.location.pathname;

    // Verifica o tipo de usuário e redireciona somente se estiver na página errada
    if (tipoUsuario === "Administrador" && !currentPath.includes("admdashboard.html")) {
        window.location.href = "../../public/adm/admdashboard.html";
    } else if (tipoUsuario === "Geral" && !currentPath.includes("geraldashboard.html")) {
        window.location.href = "../../public/geral/geraldashboard.html";
    } else if (tipoUsuario === "Manutenção" && !currentPath.includes("manutencaodashboard.html")) {
        window.location.href = "../../public/manutencao/manutencaodashboard.html";
    } else if (!["Administrador", "Geral", "Manutenção"].includes(tipoUsuario)) {
        window.location.href = "../../index.html";
    }
} else {
    // Se o usuário não estiver logado, redireciona para a página de login
    window.location.href = "../../index.html";
}

