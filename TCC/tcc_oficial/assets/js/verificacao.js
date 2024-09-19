    function logout() {
    sessionStorage.removeItem('userLogged');
    sessionStorage.removeItem('tipoUsuario');
    window.location.href = "../index.html"; // Redireciona para a página de login
}

// Verifica se o usuário está logado
if (sessionStorage.getItem('userLogged') === "true") {
    const tipoUsuario = sessionStorage.getItem('tipoUsuario');

    // Verifica o tipo de usuário e redireciona para o dashboard correspondente
    if (tipoUsuario === "Administrador") {
        window.location.href = "public/adm/admdashboard.html";
    } else if (tipoUsuario === "Geral") {
        window.location.href = "public/geral/geraldashboard.html";
    } else if (tipoUsuario === "Manutenção") {
        window.location.href = "public/manutencao/manutencaodashboard.html";
    } else {
        // Caso o tipo de usuário não seja reconhecido, redireciona para uma página de erro ou login
        window.location.href = "../../index.html"; 
    }
} else {
    // Se o usuário não estiver logado, redireciona para a página de login
    window.location.href = "../../index.html";
}
