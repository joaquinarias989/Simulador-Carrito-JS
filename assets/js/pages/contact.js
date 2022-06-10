//////////////////////////////// CONTACT EMAIL SUBJECT

let formContact = document.getElementById("formContact");
let nameInput = formContact.elements["name"];
let subjectInput = formContact.elements["_subject"];

nameInput.addEventListener("input", () => {
  subjectInput.value = `${nameInput.value} | Nuevo Mensaje desde la web`;
});

formContact.addEventListener("submit", (e) => {
  showModalAlert(
    "success",
    "Gracias por contactarnos! En breve nos comunicaremos al correo que detallaste."
  );
});
