////////////////////// Arrays, Variables,  DOM
let user = JSON.parse(localStorage.getItem("user")) ?? {};
let cart = JSON.parse(localStorage.getItem("cart")) ?? [];

let subtotal = 0;
let total = 0;
let totalQuantity = 0;
let ship = 475;

const subtotalHtml = document.getElementById("subtotal");
const totalHtml = document.getElementById("total");

const listCart = document.querySelector(".cart__resume__products");
const templateProductCart = document.getElementById("product-cart").content;

const fragment = document.createDocumentFragment();

////////////////////// Consume la "API" de Productos
const fetchData = async () => {
  const res = await fetch("../js/data/api.json");
  const data = await res.json();

  products = [...data];
  updateProds();
};

////////////////////// Muestra los Productos disponibles
const showProducts = (by) => {
  listProducts.innerHTML = `
  <article class="w-100 text-center">
    <h2>No se encontraron Productos</h2>
  </article>
  `;
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

        clone
          .querySelector(".btn-cart")
          .addEventListener("click", () => addProductToCart(prod));

        fragment.appendChild(clone);
      }
    });

  listProducts.appendChild(fragment);
};

////////////////////// Añade un producto al Carrito
const addProductToCart = (prod) => {
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
};

////////////////////// Pinta el Carrito
const updateCart = () => {
  listCart.innerHTML = "";
  cart.forEach((prod) => {
    updateProds();

    templateProductCart.querySelector(".cart__product").id = prod.id;

    templateProductCart.querySelector("img").src = prod.img;

    templateProductCart.querySelector(
      ".cart__product .cart__product__title "
    ).textContent = prod.nombre;

    templateProductCart.querySelector(
      ".cart__product .cart__product__details"
    ).textContent = `${prod.color}, ${prod.talle}`;

    templateProductCart.querySelector(
      ".cart__product .cart__product__quantity"
    ).textContent = prod.cantidad;

    templateProductCart.querySelector(
      ".cart__product .cart__product__price"
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
      elements[i].querySelector(".cart__product__quantity").textContent =
        prod.cantidad;
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
  prod.stock++;
  prod.cantidad--;

  products[products.findIndex((p) => p.id == prod.id)].cantidad = prod.cantidad;
  products[products.findIndex((p) => p.id == prod.id)].stock = prod.stock;

  const elements = listCart.getElementsByClassName("cart__product");

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].id === prod.id) {
      // Actualiza la cantidad en el html
      elements[i].querySelector(".cart__product__quantity").textContent =
        prod.cantidad;

      if (prod.cantidad == 1) {
        // Muestra el boton de Eliminar
        elements[i]
          .querySelector(".cart__product #reduceOne")
          .classList.add("d-none");
        elements[i]
          .querySelector(".cart__product #removeProd")
          .classList.remove("d-none");
      } else if (prod.cantidad == 0) {
        // Elimina el prod del carrito
        prod.cantidad = 0;
        for (let c = 0; c < cart.length; c++) {
          cart[c] === prod && cart.splice(c, 1);
        }
        elements[i].remove();
      }
    }
  }

  showProducts();
  updateTotal();
};

////////////////////// Actualiza los Totales y el Local Storage
const updateTotal = () => {
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

  subtotalHtml.textContent = `$ ${subtotal}`;
  totalHtml.textContent = `$ ${total}`;

  localStorage.setItem("cart", JSON.stringify(cart));
};

////////////////////// Actualiza la cantidad y el stock de cada producto según quedó guardado en el carrito
const updateProds = () => {
  cart.forEach((prod) => {
    products.find((p) => p.id == prod.id).cantidad = prod.cantidad;
    products.find((p) => p.id == prod.id).stock = prod.stock;
  });
};
