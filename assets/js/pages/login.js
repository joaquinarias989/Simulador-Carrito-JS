const formLogin = document.getElementById("formLogin");
const logIn = (e) => {
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
};

const logOut = (e) => {
  e.preventDefault();
  localStorage.removeItem("user");
  showModalAlert("success", "Gracias por visitarnos!");

  setTimeout(() => {
    window.location.href = "./login.html";
  }, 1000);
};

if (localStorage.getItem("user")) {
  const userLoged = JSON.parse(localStorage.getItem("user"));
  formLogin.innerHTML = `
      <h2 class="text-center">Bienvenido <span class="position-relative text-underlined px-3">${userLoged.nombre}</span>
      </h2>
      <button type="submit" class="btn-principal mt-4"><i class="fa fa-sign-in-alt"></i> Cerrar sesión</button>
      `;
  formLogin.addEventListener("submit", (e) => logOut(e));
} else formLogin.addEventListener("submit", (e) => logIn(e));
