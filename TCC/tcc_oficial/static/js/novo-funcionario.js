document.getElementById("submitData").addEventListener("click", async () => {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const nif = document.getElementById("nif").value;
  const telefone = document.getElementById("telefone").value;  // Novo campo
  const tipoUsuario = document.getElementById("tipoUsuario").value;

  try {
    await addDoc(collection(db, "users"), {
      nome,
      email,
      senha,
      nif,
      telefone,  // Enviando telefone para o Firestore
      tipoUsuario,
    });
    window.alert("Usuário Criado com Sucesso");
    window.location.href = "{% url 'funcionarios' %}"; // Redirecionar após sucesso
  } catch (error) {
    console.error("Erro ao criar usuário: ", error);
  }
});
