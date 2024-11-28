
      // Função para carregar o header de um arquivo externo //

      const carregarHeader = async () => {
        try {
          const headerContainer = document.getElementById("header-container");
          headerContainer.innerHTML = ""; // Limpa o conteúdo atual
          const response = await fetch(
            `../../components/admheader.html?${new Date().getTime()}`
          );
          const headerHtml = await response.text();
          headerContainer.innerHTML = headerHtml;

          const nomeUsuario = sessionStorage.getItem("nome");
          const userGreeting = document.querySelector("#userGreeting");

          if (!nomeUsuario) {
            userGreeting.textContent = "Bem-vindo de volta, Anônimo!";
          } else {
            userGreeting.textContent = `Bem-vindo de volta, ${nomeUsuario}!`;
          }
        } catch (error) {
          console.error("Erro ao carregar o header: ", error);
        }
      };

carregarHeader();
      

//Header ADM
 