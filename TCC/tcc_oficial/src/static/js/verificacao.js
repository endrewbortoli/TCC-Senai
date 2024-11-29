// Função de logout
function logout() {
    sessionStorage.removeItem('userLogged');
    sessionStorage.removeItem('tipoUsuario');
    sessionStorage.removeItem('nome'); // Se você também estiver armazenando o nome do usuário
    window.location.href = "/"; // Redireciona para a página de login
}

// Verifica se o usuário está logado
if (sessionStorage.getItem('userLogged') === "true") {
    
    const nomeUsuario = sessionStorage.getItem('nome'); // Nome do usuário logado
    const currentPath = window.location.pathname;
    const tipoUsuario = sessionStorage.getItem('tipoUsuario'); // Tipo de usuário salvo no sessionStorage
// Exemplo de definição de userData, caso seja necessário:
const userData = localStorage.getItem('userData'); // ou pegue o valor de algum lugar

// Utilize userData depois de garantir que está definido corretamente
if (userData) {
    console.log('Dados do usuário:', userData);
} else {
    console.log('userData não foi definido corretamente');
}


    // Verifica o tipo de usuário e redireciona se estiver acessando uma pasta não permitida
    if (tipoUsuario === "Administrador") {
        if (currentPath.includes("/geral/") || currentPath.includes("/manutencao/")) {
            // Redireciona o Administrador caso tente acessar uma área de 'Geral' ou 'Manutenção'
            window.location.href = "/adm/admdashboard";
        }
    } else if (tipoUsuario === "Geral") {
        if (currentPath.includes("/adm/") || currentPath.includes("/manutencao/")) {
            // Redireciona o usuário Geral caso tente acessar uma área de 'Administrador' ou 'Manutenção'
            window.location.href = "/geral/geraldashboard";
        }
    } else if (tipoUsuario === "Trabalhador") {
        if (currentPath.includes("/adm/") || currentPath.includes("/geral/")) {
            // Redireciona o usuário de Manutenção caso tente acessar uma área de 'Administrador' ou 'Geral'
            window.location.href = ".manutencao/manutencaodashboard";
        }
    } else {
        // Se o tipo de usuário não for reconhecido, redireciona para a página principal
        window.location.href = "/";
    }
} else {
    // Se o usuário não estiver logado, redireciona para a página de login
    window.location.href = "/";
}

if (sessionStorage.getItem('userLogged') === 'true') {
    const tipoUsuario = sessionStorage.getItem('tipoUsuario');
    if (tipoUsuario === "Administrador") {
        window.location.href = "/adm/admdashboard"; 
    } else if (tipoUsuario === "Geral") {
        window.location.href = "/geral/dashboard";
    } else if (tipoUsuario === "Trabalhador") {
        window.location.href = "/manutencao/dashboard";
    }
}
