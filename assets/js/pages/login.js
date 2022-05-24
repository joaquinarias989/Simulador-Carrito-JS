const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(formLogin);

  if (
    !users.find(
      (u) =>
        u.email === formData.get("email") &&
        u.contraseña === formData.get("password")
    )
  ) {
    showModalAlert(
      "error",
      "El Email y/o contraseña ingresados son incorrectos"
    );

    return;
  }

  localStorage.setItem(
    "user",
    JSON.stringify(users.find((u) => u.email == formData.get("email")))
  );

  showModalAlert("success", "Logueado exitosamente");

  setTimeout(() => {
    window.location.href = "./cart.html";
  }, 1000);
});
