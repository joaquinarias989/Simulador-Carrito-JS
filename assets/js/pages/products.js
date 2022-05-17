////////////////////// Arrays, Variables,  DOM

let cart = JSON.parse(localStorage.getItem("cart")) ?? [];

let ship = 475;

const shipCart = document.getElementById("ship-cart");

const listProducts = document.querySelector(".products__list");
const templateProduct = document.getElementById("product-card").content;

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

////////////////////// Lógica de los Filtros

const filterGroup = document.querySelector(".filter");
const inputSearch = filterGroup.querySelector(".form__input");
inputSearch.addEventListener("input", () => showProducts(inputSearch.value));

////////////////////// Pinta el Carrito y actualiza el stock de productos según Local Storage
const updateCart = () => {
  cart.forEach((prod) => {
    //actualiza la cantidad y el stock de cada producto según quedó guardo en el carrito
    products.find((p) => p.id == prod.id).cantidad = prod.cantidad;
    products.find((p) => p.id == prod.id).stock = prod.stock;
  });
  updateTotal();
};

////////////////////// Añade un producto al Carrito
const addProductToCart = (prod, alertOK) => {
  if (prod.stock <= 0) {
    showModalAlert(
      "warning",
      "No tenemos más stock del producto por el momento, disculpe"
    );
    // showProducts();
    return;
  }

  prod.stock -= 1;
  prod.cantidad += 1;
  showToast(alertOK);

  if (cart.some((p) => p.id == prod.id)) {
    let indice = cart.findIndex((index) => index.id == prod.id);
    cart[indice].cantidad = prod.cantidad;
    cart[indice].stock = prod.stock;
  } else cart.push(prod);

  // showProducts();
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

  showProducts();
  updateTotal();
};

////////////////////// Disminuye un producto del Carrito
const decreaseQuantity = (prod) => {
  if (prod.cantidad > 1) {
    prod.stock++;
    prod.cantidad--;
  } else if (prod.cantidad == 1) {
    prod.stock++;
    prod.cantidad = 0;
    for (let c = 0; c < cart.length; c++) {
      if (cart[c] === prod) {
        cart.splice(c, 1);
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
  } catch (error) {
    console.log(error);
  }
};

init();
