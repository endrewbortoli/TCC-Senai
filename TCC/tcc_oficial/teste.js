const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function testeLogin() {
  // Configuração do navegador (gráfico ou headless)
  let options = new chrome.Options();
  // options.addArguments("--headless"); // Descomente para rodar sem abrir o navegador

  let driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Caminho para o arquivo HTML local
    const url =
      "file:///C:/xampp/htdocs/sprint4/TCC-Senai/TCC/tcc_oficial/index.html"; // Atualize com o caminho real do seu arquivo

    // Abre o arquivo HTML
    await driver.get(url);

    // Preenche o campo "NIF"
    const nifInput = await driver.findElement(By.id("nif"));
     await nifInput.sendKeys("sn128810");

    // Preenche o campo "Senha"
    const senhaInput = await driver.findElement(By.id("senha"));
    await senhaInput.sendKeys("123456");

    // Clique no botão de login
    const loginBtn = await driver.findElement(By.id("loginBtn"));
    await loginBtn.click();

    // Aguarda por uma resposta (ajuste conforme o tempo necessário para o carregamento)
    await driver.sleep(3000);

    // Valida se ocorreu o login bem-sucedido ou falhou
      try {
      const alertText = await driver.switchTo().alert().getText();
      console.log("Mensagem de alerta exibida:", alertText);

      // Fecha o alerta
      await driver.switchTo().alert().accept();
    } catch (error) {
      console.error("Nenhum alerta foi exibido ou houve erro:", error);
    }
  } catch (error) {
    console.error("Erro durante o teste:", error);
  } finally {
    // Fecha o navegador ao final do teste
    await driver.quit();
  }
})();
