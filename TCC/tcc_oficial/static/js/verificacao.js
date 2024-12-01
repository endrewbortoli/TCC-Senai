// Função de logout
function logout() {
    sessionStorage.removeItem('userLogged');
    sessionStorage.removeItem('tipoUsuario');
    sessionStorage.removeItem('nome'); // Se você também estiver armazenando o nome do usuário
    console.log("Usuário deslogado");
    window.location.href = "/"; // Redireciona para a página de login
}

// Verifica se o usuário está logado
if (sessionStorage.getItem('userLogged') === "true") {
    console.log("Usuário logado");

    const nomeUsuario = sessionStorage.getItem('nome'); // Nome do usuário logado
    const currentPath = window.location.pathname;
    const tipoUsuario = sessionStorage.getItem('tipoUsuario'); // Tipo de usuário salvo no sessionStorage
    
    console.log("Nome do usuário:", nomeUsuario);
    console.log("Tipo de usuário:", tipoUsuario);
    console.log("Caminho atual:", currentPath);

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
            console.log("Redirecionando Administrador para o Dashboard de Administração");
            window.location.href = "/adm/admdashboard";
        }
    } else if (tipoUsuario === "Geral") {
        if (currentPath.includes("/adm/") || currentPath.includes("/manutencao/")) {
            // Redireciona o usuário Geral caso tente acessar uma área de 'Administrador' ou 'Manutenção'
            console.log("Redirecionando usuário Geral para o Dashboard Geral");
            window.location.href = "/geral/geraldashboard";
        }
    } else if (tipoUsuario === "Trabalhador") {
        if (currentPath.includes("/adm/") || currentPath.includes("/geral/")) {
            // Redireciona o usuário de Manutenção caso tente acessar uma área de 'Administrador' ou 'Geral'
            console.log("Redirecionando usuário de Manutenção para o Dashboard de Manutenção");
            window.location.href = "/manutencao/manutencaodashboard";
        }
    } else {
        // Se o tipo de usuário não for reconhecido, redireciona para a página principal
        console.log("Tipo de usuário não reconhecido. Redirecionando para a página principal.");
        window.location.href = "/"; // Ou página de login
    }
} else {
    console.log("Usuário não logado, redirecionando para a página de login.");
    // Se o usuário não estiver logado, redireciona para a página de login
    window.location.href = "/"; // Página de login
}

