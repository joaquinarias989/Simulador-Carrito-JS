////////////////////// Arrays, Variables,  DOM

let cart = JSON.parse(localStorage.getItem("cart")) ?? [];
let user = JSON.parse(localStorage.getItem("user")) ?? {};
let ship = 475;

const shipCart = document.getElementById("ship-cart");
const shipInfo = document.getElementById("ship-data");
const subtotalHtml = document.getElementById("subtotal");
const totalHtml = document.getElementById("total");

const listProducts = document.querySelector(".interes__slide");
const templateProduct = document.getElementById("product-card").content;

const listCart = document.querySelector(".cart__resume__products");
const templateProductCart = document.getElementById("product-cart").content;

const fragment = document.createDocumentFragment();

//////////////////////// Lógica de los Modales

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

////////////////////// Muestra los Productos disponibles
const showProducts = (by) => {
  listProducts.innerHTML = `<article class="w-100 text-center">
  <h2>No se encontraron Productos</h2>
</article>`;
  by === undefined ? (by = "") : (by = by.trim().toLowerCase());
  products
    .filter(
      (p) =>
        p.nombre.toLowerCase().includes(by) ||
        p.categoria.toLowerCase().includes(by) ||
        p.color.toLowerCase().includes(by)
    )
    .forEach((prod) => {
      if (prod.stock > 0) {
        listProducts.innerHTML = "";

        templateProduct
          .querySelector(".product__card")
          .setAttribute("id", prod.id);
        templateProduct.querySelector("img").setAttribute("src", prod.img);
        templateProduct.querySelector(".product__card__title").textContent =
          prod.nombre;
        templateProduct.querySelector(
          ".product__card__price"
        ).textContent = `$ ${prod.precio}`;

        const clone = templateProduct.cloneNode(true);

        const alertOK = clone.querySelector("#alertOK");
        clone
          .querySelector(".btn-cart")
          .addEventListener("click", () => addProductToCart(prod, alertOK));

        fragment.appendChild(clone);
      }
    });

  listProducts.appendChild(fragment);
};

////////////////////// Pinta el Carrito y actualiza el stock de productos según Local Storage
const updateCart = () => {
  listCart.innerHTML = "";
  cart.forEach((prod) => {
    //actualiza la cantidad y el stock de cada producto según quedó guardo en el carrito
    products.find((p) => p.id == prod.id).cantidad = prod.cantidad;
    products.find((p) => p.id == prod.id).stock = prod.stock;

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
};

////////////////////// Añade un producto al Carrito
const addProductToCart = (prod, alertOK) => {
  if (prod.stock <= 0) {
    showModalAlert(
      "warning",
      "No tenemos más stock del producto por el momento, disculpe"
    );
    showProducts();
    return;
  }

  prod.stock -= 1;
  prod.cantidad += 1;
  showToast(alertOK);

  if (cart.some((p) => p.id == prod.id)) {
    let indice = cart.findIndex((index) => index.id == prod.id);
    cart[indice].cantidad = prod.cantidad;
    cart[indice].stock = prod.stock;

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

        updateTotal();
        return;
      }
    }
  } else {
    cart.push(prod);

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
    ).textContent = `$ ${prod.precio * prod.cantidad}`;

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

    fragment.appendChild(clone);

    listCart.appendChild(fragment);
  }

  showProducts();
  updateTotal();
};

////////////////////// Aumenta un producto del Carrito
const increaseQuantity = (prod) => {
  if (prod.stock <= 0) {
    showModalAlert(
      "warning",
      "No tenemos más stock del producto por el momento, disculpe"
    );
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
};

////////////////////// Disminuye un producto del Carrito
const decreaseQuantity = (prod) => {
  const elements = listCart.getElementsByClassName("cart__product");

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].id === prod.id) {
      if (prod.cantidad > 2) {
        prod.stock++;
        prod.cantidad--;
        let elementQuantity = elements[i].querySelector(".input-quantity");
        elementQuantity.textContent = prod.cantidad;
      } else if (prod.cantidad == 2) {
        prod.stock++;
        prod.cantidad--;
        elements[i]
          .querySelector(".cart__product #reduceOne")
          .classList.add("d-none");
        elements[i]
          .querySelector(".cart__product #removeProd")
          .classList.remove("d-none");

        let elementQuantity = elements[i].querySelector(".input-quantity");
        elementQuantity.textContent = prod.cantidad;
      } else if (prod.cantidad == 1) {
        prod.stock++;
        prod.cantidad = 0;
        for (let c = 0; c < cart.length; c++) {
          if (cart[c] === prod) {
            cart.splice(c, 1);
          }
        }
        elements[i].remove();
      }
    }
  }

  products[products.findIndex((p) => p.id == prod.id)].cantidad = prod.cantidad;
  products[products.findIndex((p) => p.id == prod.id)].stock = prod.stock;

  updateTotal();
  showProducts();
  return;
};

////////////////////// Actualiza los Totales y el Local Storage
const updateTotal = () => {
  let subtotal = 0;
  let total = 0;
  let totalQuantity = 0;
  let showQuantity = document.querySelector(".cart-quantity");

  subtotal = cart.reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );
  totalQuantity = cart.reduce((acc, { cantidad }) => acc + cantidad, 0);

  total = subtotal + ship;
  subtotalHtml.textContent = `$ ${subtotal}`;
  totalHtml.textContent = `$ ${total}`;
  totalQuantity == 0
    ? (showQuantity.textContent = "")
    : (showQuantity.textContent = totalQuantity);

  localStorage.setItem("cart", JSON.stringify(cart));
};

////////////////////// Muestra el aviso de "Producto agregado exitosamente"
const showToast = (alertOK) => {
  alertOK.classList.add("active");
  if (alertOK.classList.contains("active")) {
    setTimeout(() => {
      alertOK.classList.remove("active");
    }, 500);
  }
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
    document.addEventListener("DOMContentLoaded", (e) => {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        updateCart();
      }
      showProducts();
    });

    shipInfo.textContent = `$ ${ship}`;
    shipCart.textContent = `$ ${ship}`;
  } catch (error) {
    console.log(error);
  }
};

init();
