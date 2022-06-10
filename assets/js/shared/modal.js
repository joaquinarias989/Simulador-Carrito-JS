const modal = document.getElementById("modal-alert");
const modalIcon = modal.querySelector("i");
const modalBtn = modal.querySelector(".btn-principal");

const showModalAlert = (type, text) => {
  modalIcon.removeAttribute("class");
  if (type == "success") {
    modalIcon.setAttribute("class", "fa fa-check");
    modalBtn.remove();
  } else if (type == "warning")
    modalIcon.setAttribute("class", "fa fa-exclamation");
  else if (type == "error") modalIcon.setAttribute("class", "fa fa-times");

  modal.querySelector("h3").textContent = text;
  modal.showModal();
};

modalBtn.onclick = () => {
  modal.close();
};
