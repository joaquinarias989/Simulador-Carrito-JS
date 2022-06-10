const shipCart = document.getElementById("ship-cart");
const shipInfo = document.getElementById("ship-data");

const listProducts = document.querySelector(".interes__slide");
const templateProduct = document.getElementById("product-card").content;

////////////////////// Lógica del Formulario que te lleva a terminar al compra por WhatsApp
const formPurchase = document.getElementById("formPurchase");

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
  const prodsList = cart
    .map(
      (item) =>
        `Producto: ${item.nombre}\nColor: ${item.color}\nTalle: ${
          item.talle
        }\nCantidad: ${item.cantidad}\nSubtotal: $${
          item.precio * item.cantidad
        }`
    )
    .join("\n\n");

  const messageWpp = `Hola! Quiero realizar la siguiente compra:\n\n${prodsList}\n\nEnvío: $ ${ship}\n*Total a pagar: ${
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

  showModalAlert(
    "success",
    `Gracias ${formData.get(
      "name"
    )} por elegirnos.\nEl total de tu compra es de ${totalHtml.textContent}.\n
    Serás redireccionado en unos instantes.`
  );

  setTimeout(() => {
    window.open("../../index.html", "_self");
    window.open(urlWpp, "_blank");
  }, 5000);
});

//////////////////////
////////////////////// Función principal - Inicializa el programa
//////////////////////

const init = () => {
  try {
    shipInfo.textContent = `$ ${ship}`;
    shipCart.textContent = `$ ${ship}`;

    if (user.hasOwnProperty("nombre")) {
      formPurchase.elements["email"].value = user.email;
      formPurchase.elements["name"].value = user.nombre;
      formPurchase.elements["postalcode"].value = user.codpostal;
      formPurchase.elements["province"].value = user.provincia;
      formPurchase.elements["address"].value = user.domicilio;
    }

    document.addEventListener("DOMContentLoaded", async () => {
      await fetchData();

      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        updateCart();
      }
      showProducts();
    });
  } catch (error) {
    showModalAlert("error", error);
  }
};

init();
