const formRegister = document.getElementById("formRegister");

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(formRegister);

  if (users.find((u) => u.email == formData.get("email"))) {
    // showModalAlert(
    //   "error",
    //   "El email ingresado ya está registrado en nuestra Web"
    // );
    Swal.fire({
      text: "El email ingresado ya está registrado en nuestra Web",
      icon: "error",
      iconColor: "#ffda07",
      confirmButtonText: "OK",
      confirmButtonColor: "#ffda07",
    });
    return;
  }

  const newUser = new Usuario(
    formData.get("name"),
    formData.get("email"),
    formData.get("password"),
    formData.get("postalcode"),
    formData.get("province"),
    formData.get("address")
  );

  users.push(newUser);
  localStorage.setItem("user", JSON.stringify(newUser));

  // showModalAlert(
  //   "success",
  //   `Gracias ${users[users.length - 1].nombre} por registrarte.`
  // );
  Swal.fire({
    text: `Gracias ${users[users.length - 1].nombre} por registrarte.`,
    icon: "success",
    iconColor: "#ffda07",
    showConfirmButton: false,
  });

  setTimeout(() => {
    window.location.href = "./cart.html";
  }, 3000);
});
