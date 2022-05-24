const shipCart = document.getElementById("ship-cart");
const shipInfo = document.getElementById("ship-data");

const listProducts = document.querySelector(".interes__slide");
const templateProduct = document.getElementById("product-card").content;

////////////////////// Lógica del Formulario que te lleva a terminar al compra por WhatsApp
const formPurchase = document.getElementById("formPurchase");
if (user.hasOwnProperty("nombre")) {
  formPurchase.elements["email"].value = user.email;
  formPurchase.elements["name"].value = user.nombre;
  formPurchase.elements["postalcode"].value = user.codpostal;
  formPurchase.elements["province"].value = user.provincia;
  formPurchase.elements["address"].value = user.domicilio;
}

formPurchase.addEventListener("submit", (e) => {
  e.preventDefault();

  if (cart.length == 0) {
    showModalAlert(
      "error",
      "Debes agregar al menos 1 producto para realizar la compra"
    );
    return;
  }

  const formData = new FormData(formPurchase);
  const prodsWpp = cart
    .map(
      (item) =>
        `Producto: ${item.nombre}\nColor: ${item.color}\nTalle: ${
          item.talle
        }\nCantidad: ${item.cantidad}\nSubtotal: $${
          item.precio * item.cantidad
        }`
    )
    .join("\n\n");

  const messageWpp = `Hola! Quiero realizar la siguiente compra:\n\n${prodsWpp}\n\nEnvío: $ ${ship}\n*Total a pagar: ${
    totalHtml.textContent
  }*\n\nDetallo mis datos:\n\nNombre: ${formData.get(
    "name"
  )}\nEmail: ${formData.get("email")}\nCód. Postal: ${formData.get(
    "postalcode"
  )}\nProvincia: ${formData
    .get("province")
    .toUpperCase()}\nDomicilio: ${formData.get(
    "address"
  )}\nDepartamento: ${formData.get("department")}\nTeléfono: ${formData.get(
    "phone"
  )}\nDNI/CUIL: ${formData.get("dni")}`;

  const urlWpp = encodeURI(
    `https://api.whatsapp.com/send?phone=543576412036&text=${messageWpp}`
  );

  localStorage.removeItem("cart");
  localStorage.removeItem("user");

  showModalAlert(
    "success",
    `Gracias ${formData.get(
      "name"
    )} por elegirnos. El total de tu compra es de ${totalHtml.textContent}.
    Serás redireccionado en unos instantes.`
  );

  setTimeout(() => {
    window.open(urlWpp, "_blank");
    window.location.reload();
  }, 5000);
});

//////////////////////
////////////////////// Función principal - Inicializa el programa
//////////////////////

const init = () => {
  try {
    document.addEventListener("DOMContentLoaded", () => {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        updateProds();
        updateCart();
      }
      showProducts();
    });

    shipInfo.textContent = `$ ${ship}`;
    shipCart.textContent = `$ ${ship}`;
  } catch (error) {
    showModalAlert("error", error);
  }
};

init();
