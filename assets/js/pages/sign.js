const formRegister = document.getElementById("formRegister");

const modal = document.getElementById("modal-alert");
const modalIcon = modal.querySelector("i");
const modalBtn = modal.querySelector(".btn-principal");

modalBtn.onclick = () => {
  modal.close();
};
const showModalAlert = (type, text) => {
  modalIcon.removeAttribute("class");
  if (type == "success") {
    modalIcon.setAttribute("class", "fa fa-check");
    modalBtn.remove();
  } else if (type == "warning") modalIcon.setAttribute("class", "fa fa-info");
  else if (type == "error") modalIcon.setAttribute("class", "fa fa-times");

  modal.querySelector("h3").textContent = text;

  modal.showModal();
};

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(formRegister);

  if (users.find((u) => u.email == formData.get("email"))) {
    showModalAlert(
      "error",
      `El email ingresado ya está registrado en nuestra Web`
    );
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

  showModalAlert(
    "success",
    `Gracias ${users[users.length - 1].nombre} por registrarte.`
  );

  setTimeout(() => {
    window.location.href = "./cart.html";
  }, 3000);
});
