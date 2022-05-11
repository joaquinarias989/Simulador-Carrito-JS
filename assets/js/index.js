////////////////////// CLASES

class Producto {
  constructor(
    id,
    nombre,
    precio,
    descripcion,
    color,
    talle,
    stock,
    img,
    cantidad
  ) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.color = color;
    this.talle = talle;
    this.stock = stock;
    this.img = img;
    this.cantidad = cantidad;
  }
}

class Usuario {
  constructor(id, nombre, email, contraseña) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.contraseña = contraseña;
  }
}

////////////////////// Productos de prueba

const prod1 = new Producto(
  "RMPN",
  "Remera Phenomenally",
  2380,
  "Lorem ipsum dolor",
  "Negro",
  "M",
  2,
  "./assets/img/shirt-yellow.webp",
  0
);
const prod2 = new Producto(
  "RRDA",
  "Remera Risks & Dreams",
  2499,
  "Lorem ipsum dolor",
  "Amarillo",
  "XL",
  3,
  "./assets/img/tshirt-2.webp",
  0
);
const prod3 = new Producto(
  "BCN",
  "Buzo Chineze",
  4630,
  "Lorem ipsum dolor",
  "Negro",
  "L",
  2,
  "./assets/img/buzo.webp",
  0
);
const prod4 = new Producto(
  "JBN",
  "Jacket Bomber",
  5500,
  "Lorem ipsum dolor",
  "Negro",
  "S",
  2,
  "./assets/img/campera.webp",
  0
);

////////////////////// Usuarios de prueba

const usuario1 = new Usuario(
  "JQN",
  "Joaquin Arias",
  "joaquinarias989@gmail.com",
  "12345"
);
const usuario2 = new Usuario(
  "FD",
  "Federico Gimenez",
  "fdg@gmail.com",
  "fede123"
);

////////////////////// Arrays, Variables,  DOM

let users = [usuario1, usuario2];
let products = [prod1, prod2, prod3, prod4];
let cart = [];

let ship = 475;

const shipCart = document.getElementById("ship-cart");
const shipInfo = document.getElementById("ship-data");
const subtotalHtml = document.getElementById("subtotal");
const totalHtml = document.getElementById("total");

const listProducts = document.querySelector(".products__list");
const templateProduct = document.getElementById("product-card").content;

const listCart = document.querySelector(".cart__resume__products");
const templateProductCart = document.getElementById("product-cart").content;

const fragment = document.createDocumentFragment();

////////////////////// Muestra los Productos disponibles

const showProducts = () => {
  products.forEach((prod) => {
    if (prod.stock > 0) {
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

      fragment.appendChild(clone);
    }
  });
  listProducts.appendChild(fragment);
};

////////////////////// Inicializa el programa

const init = () => {
  try {
    showProducts();
  } catch (error) {
    console.log(error);
  }
};

init();

////////////////////// Logica del boton de añadir al carrito

const btnCart = document.querySelectorAll(".btn-cart");
const showQuantity = document.querySelector(".cart-quantity");

btnCart.forEach((btn) => {
  btn.addEventListener("click", getProductOnClick);
});

function getProductOnClick(event) {
  const button = event.target;
  const itemProd = button.closest(".product__card");

  const alertOK = itemProd.querySelector("#alertOK");
  const prod = products.find((p) => p.id === itemProd.id);

  addProductToCart(prod, alertOK);
}

const addProductToCart = (prod, alertOK) => {
  if (prod.stock <= 0) {
    alert(`No tenemos más stock del producto por el momento, disculpe.-`);
    return;
  }
  prod.stock -= 1;
  prod.cantidad += 1;

  if (cart.includes(prod)) {
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

  showAlertOK(alertOK);

  updateTotal();
};

const increaseQuantity = (prod) => {
  if (prod.stock <= 0) {
    alert(`No tenemos más stock del producto por el momento, disculpe.-`);
    return;
  }
  const elements = listCart.getElementsByClassName("cart__product");

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].id === prod.id) {
      prod.stock -= 1;
      prod.cantidad += 1;

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

  updateTotal();
};

const decreaseQuantity = (prod) => {
  const elements = listCart.getElementsByClassName("cart__product");

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].id === prod.id) {
      if (prod.cantidad > 2) {
        prod.stock += 1;
        prod.cantidad -= 1;
        let elementQuantity = elements[i].querySelector(".input-quantity");
        elementQuantity.textContent = prod.cantidad;
      } else if (prod.cantidad == 2) {
        prod.stock += 1;
        prod.cantidad -= 1;
        elements[i]
          .querySelector(".cart__product #reduceOne")
          .classList.add("d-none");
        elements[i]
          .querySelector(".cart__product #removeProd")
          .classList.remove("d-none");

        let elementQuantity = elements[i].querySelector(".input-quantity");
        elementQuantity.textContent = prod.cantidad;
      } else if (prod.cantidad == 1) {
        prod.stock += 1;
        prod.cantidad = 0;
        for (let c = 0; c < cart.length; c++) {
          if (cart[c] === prod) {
            cart.splice(c, 1);
          }
        }
        elements[i].remove();

        // elements[i].querySelector(".btn-secondary").classList.toggle("d-none");
        // elements[i].querySelector(".btn-remove").classList.toggle("d-flex");
        // prod.cantidad = 1;
      }
    }
  }

  updateTotal();
  return;
};

const updateTotal = () => {
  let subtotal = 0;
  let total = 0;
  subtotal = cart.reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );

  total = subtotal + ship;
  subtotalHtml.textContent = `$ ${subtotal}`;
  totalHtml.textContent = `$ ${total}`;

  let totalQuantity = cart.reduce((acc, { cantidad }) => acc + cantidad, 0);
  showQuantity.textContent = totalQuantity;
};

const showAlertOK = (alertOK) => {
  alertOK.classList.add("active");
  if (alertOK.classList.contains("active")) {
    setTimeout(() => {
      alertOK.classList.remove("active");
    }, 500);
  }
};
