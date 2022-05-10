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
let subtotal = 0;
let total = 0;

const shipCart = document.getElementById("ship-cart");
const shipInfo = document.getElementById("ship-data");
const subtotalHtml = document.getElementById("subtotal");
const totalHtml = document.getElementById("total");

////////////////////// Muestra los Productos disponibles

const listProducts = document.querySelector(".products__list");
const templateProduct = document.getElementById("product-card").content;
const fragment = document.createDocumentFragment();

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

////////////////////// Inicializa el script

const init = () => {
  try {
    showProducts();
    shipInfo.textContent = `$ ${ship}`;
    shipCart.textContent = `$ ${ship}`;
  } catch (error) {
    console.log(error);
  }
};

init();

////////////////////// Logica del boton de añadir al carrito (las variables las declaro ahora porque los btnCart no existen antes de mostrar los productos)

const listCart = document.querySelector(".cart__resume__products");
const templateProductCart = document.getElementById("product-cart").content;
const btnCart = document.querySelectorAll(".btn-cart");

const getProductOnClick = (event) => {
  const button = event.target;
  const prod = button.closest(".product__card");

  const prodId = prod.id;
  const alertOK = prod.querySelector("#alertOK");

  addProductToCart(prodId, alertOK);

  const prodSelected = products.find((p) => p.id === prodId);
  if (prodSelected.cantidad == 1) {
    updateInputQuantity(prodId);
  }
};

const addProductToCart = (prodId, alertOK) => {
  const prod = products.find((p) => p.id === prodId);

  if (prod.stock > 0) {
    if (cart.includes(prod)) {
      listCart.querySelectorAll(".cart__product").forEach((item) => {
        if (prod.id === item.getAttribute("id")) {
          prod.stock -= 1;
          prod.cantidad += 1;
          console.log(cart[cart.length - 1]);

          item.querySelector(".cart__product .input-quantity").textContent =
            prod.cantidad;
          item.querySelector(".cart__product #price").textContent = `$ ${
            prod.precio * prod.cantidad
          }`;
        }
      });
    } else {
      cart.push(prod);
      prod.stock -= 1;
      prod.cantidad += 1;
      console.log(cart[cart.length - 1]);

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
      fragment.appendChild(clone);

      listCart.appendChild(fragment);
    }

    showAlertOK(alertOK);

    subtotal += cart[cart.length - 1].precio;
    total = subtotal + ship;

    subtotalHtml.textContent = `$ ${subtotal}`;
    totalHtml.textContent = `$ ${total}`;
  } else {
    alert(`No tenemos más stock del producto por el momento, disculpe.-`);
  }
};

const showAlertOK = (alertOK) => {
  alertOK.classList.add("active");
  if (alertOK.classList.contains("active")) {
    setTimeout(() => {
      alertOK.classList.remove("active");
    }, 500);
  }
};

const updateInputQuantity = (prodId) => {
  const prod = products.find((p) => p.id === prodId);

  listCart.querySelectorAll(".cart__product").forEach((item) => {
    if (prod.id === item.getAttribute("id")) {
      let addOne = item.querySelector(".cart__product #addOne");
      let reduceOne = item.querySelector(".cart__product #reduceOne");

      addOne.addEventListener("click", () => {
        if (prod.stock > 0) {
          prod.stock -= 1;
          prod.cantidad += 1;
          item.querySelector(".cart__product .input-quantity").textContent =
            prod.cantidad;
          item.querySelector(".cart__product #price").textContent = `$ ${
            prod.precio * prod.cantidad
          }`;

          subtotal += cart[cart.length - 1].precio;
          total = subtotal + ship;

          subtotalHtml.textContent = `$ ${subtotal}`;
          totalHtml.textContent = `$ ${total}`;
        } else {
          alert(`No tenemos más stock del producto por el momento, disculpe.-`);
        }
      });

      reduceOne.addEventListener("click", () => {
        if (prod.cantidad > 1) {
          prod.stock += 1;
          prod.cantidad -= 1;
          item.querySelector(".cart__product .input-quantity").textContent =
            prod.cantidad;
          item.querySelector(".cart__product #price").textContent = `$ ${
            prod.precio * prod.cantidad
          }`;
        } else if (prod.cantidad == 1) {
          prod.stock += 1;
          prod.cantidad -= 1;
          cart.splice(
            cart.find((c) => c === prod),
            1
          );
          item.remove();
        }
        cart.length > 0
          ? (subtotal -= cart[cart.length - 1].precio)
          : (subtotal = 0);

        total = subtotal + ship;
        subtotalHtml.textContent = `$ ${subtotal}`;
        totalHtml.textContent = `$ ${total}`;
      });
    }
  });
};

btnCart.forEach((btn) => {
  btn.addEventListener("click", getProductOnClick);
});
