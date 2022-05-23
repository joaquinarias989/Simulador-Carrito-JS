let user = JSON.parse(localStorage.getItem("user")) ?? {};

const shipCart = document.getElementById("ship-cart");
const shipInfo = document.getElementById("ship-data");
const subtotalHtml = document.getElementById("subtotal");
const totalHtml = document.getElementById("total");

const listProducts = document.querySelector(".interes__slide");
const templateProduct = document.getElementById("product-card").content;

const listCart = document.querySelector(".cart__resume__products");
const templateProductCart = document.getElementById("product-cart").content;

////////////////////// Pinta el Carrito
const updateCart = () => {
  listCart.innerHTML = "";
  cart.forEach((prod) => {
    updateProds();

    templateProductCart.querySelector(".cart__product").id = prod.id;

    templateProductCart.querySelector("img").src = prod.img;

    templateProductCart.querySelector(
      ".cart__product #product__name"
    ).textContent = prod.nombre;

    templateProductCart.querySelector(
      ".cart__product #details"
    ).textContent = `${prod.color}, ${prod.talle}`;

    templateProductCart.querySelector(
      ".cart__product .input-quantity"
    ).textContent = prod.cantidad;

    templateProductCart.querySelector(
      ".cart__product #price"
    ).textContent = `$ ${prod.precio}`;

    const clone = templateProductCart.cloneNode(true);

    clone
      .querySelector(".cart__product #addOne")
      .addEventListener("click", () => increaseQuantity(prod));

    clone
      .querySelector(".cart__product #reduceOne")
      .addEventListener("click", () => decreaseQuantity(prod));

    clone
      .querySelector(".cart__product #removeProd")
      .addEventListener("click", () => decreaseQuantity(prod));

    if (prod.cantidad > 1) {
      clone
        .querySelector(".cart__product #reduceOne")
        .classList.toggle("d-none");
      clone
        .querySelector(".cart__product #removeProd")
        .classList.toggle("d-none");
    }

    fragment.appendChild(clone);
  });
  listCart.appendChild(fragment);
  updateTotal();
  subtotalHtml.textContent = `$ ${subtotal}`;
  totalHtml.textContent = `$ ${total}`;
};

////////////////////// Añade un producto al Carrito
const addProductToCart = (prod) => {
  if (prod.stock <= 0) {
    // showModalAlert(
    //   "warning",
    //   "No tenemos más stock del producto por el momento, disculpe"
    // );
    Swal.fire({
      text: "No tenemos más stock del producto por el momento, disculpe",
      icon: "warning",
      iconColor: "#ffda07",
      confirmButtonText: "OK",
      confirmButtonColor: "#ffda07",
    });
    showProducts();
    return;
  }

  prod.stock -= 1;
  prod.cantidad += 1;

  if (cart.some((p) => p.id == prod.id)) {
    let indice = cart.findIndex((index) => index.id == prod.id);
    cart[indice].cantidad = prod.cantidad;
    cart[indice].stock = prod.stock;
  } else cart.push(prod);

  Toastify({
    text: "Producto agregado con éxito!",
    className: "info",
    duration: 1500,
    stopOnFocus: false,
    offset: {
      y: "7rem",
    },
  }).showToast();
  updateCart();
  showProducts();
};

////////////////////// Aumenta un producto del Carrito
const increaseQuantity = (prod) => {
  if (prod.stock <= 0) {
    // showModalAlert(
    //   "warning",
    //   "No tenemos más stock del producto por el momento, disculpe"
    // );
    Swal.fire({
      text: "No tenemos más stock del producto por el momento, disculpe",
      icon: "warning",
      iconColor: "#ffda07",
      confirmButtonText: "OK",
      confirmButtonColor: "#ffda07",
    });
    showProducts();
    return;
  }
  prod.stock--;
  prod.cantidad++;

  products[products.findIndex((p) => p.id == prod.id)].cantidad = prod.cantidad;
  products[products.findIndex((p) => p.id == prod.id)].stock = prod.stock;

  const elements = listCart.getElementsByClassName("cart__product");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].id === prod.id) {
      let elementQuantity = elements[i].querySelector(".input-quantity");
      elementQuantity.textContent = prod.cantidad;
      elements[i]
        .querySelector(".cart__product #reduceOne")
        .classList.remove("d-none");
      elements[i]
        .querySelector(".cart__product #removeProd")
        .classList.add("d-none");
    }
  }

  showProducts();
  updateTotal();
  subtotalHtml.textContent = `$ ${subtotal}`;
  totalHtml.textContent = `$ ${total}`;
};

////////////////////// Disminuye un producto del Carrito
const decreaseQuantity = (prod) => {
  prod.stock++;
  prod.cantidad--;

  const elements = listCart.getElementsByClassName("cart__product");

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].id === prod.id) {
      let elementQuantity = elements[i].querySelector(".input-quantity");
      elementQuantity.textContent = prod.cantidad;
      if (prod.cantidad == 1) {
        elements[i]
          .querySelector(".cart__product #reduceOne")
          .classList.add("d-none");
        elements[i]
          .querySelector(".cart__product #removeProd")
          .classList.remove("d-none");

        let elementQuantity = elements[i].querySelector(".input-quantity");
        elementQuantity.textContent = prod.cantidad;
      } else if (prod.cantidad == 0) {
        prod.cantidad = 0;
        for (let c = 0; c < cart.length; c++) {
          cart[c] === prod && cart.splice(c, 1);
        }
        elements[i].remove();
      }
    }
  }

  products[products.findIndex((p) => p.id == prod.id)].cantidad = prod.cantidad;
  products[products.findIndex((p) => p.id == prod.id)].stock = prod.stock;

  showProducts();
  updateTotal();
  subtotalHtml.textContent = `$ ${subtotal}`;
  totalHtml.textContent = `$ ${total}`;
};

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
    // showModalAlert(
    //   "error",
    //   "Debes agregar al menos 1 producto para realizar la compra"
    // );
    Swal.fire({
      text: "Debes agregar al menos 1 producto para realizar la compra",
      icon: "error",
      iconColor: "#ffda07",
      confirmButtonText: "OK",
      confirmButtonColor: "#ffda07",
    });
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

  // showModalAlert(
  //   "success",
  //   `Gracias ${formData.get(
  //     "name"
  //   )} por elegirnos. El total de tu compra es de ${totalHtml.textContent}.
  //   Serás redireccionado en unos instantes.`
  // );
  Swal.fire({
    text: `Gracias ${formData.get(
      "name"
    )} por elegirnos. El total de tu compra es de ${
      totalHtml.textContent
    }. Serás redireccionado en unos instantes.`,
    icon: "success",
    iconColor: "#ffda07",
    showConfirmButton: false,
  });

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
    document.addEventListener("DOMContentLoaded", (e) => {
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
