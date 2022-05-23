////////////////////// Arrays, Variables,  DOM
let cart = JSON.parse(localStorage.getItem("cart")) ?? [];

let subtotal = 0;
let total = 0;
let totalQuantity = 0;
let ship = 475;

const fragment = document.createDocumentFragment();

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

        // const alertOK = clone.querySelector("#alertOK");
        clone
          .querySelector(".btn-cart")
          .addEventListener("click", () => addProductToCart(prod, alertOK));

        fragment.appendChild(clone);
      }
    });

  listProducts.appendChild(fragment);
};

////////////////////// Actualiza la cantidad y el stock de cada producto según quedó guardado en el carrito
const updateProds = () => {
  cart.forEach((prod) => {
    products.find((p) => p.id == prod.id).cantidad = prod.cantidad;
    products.find((p) => p.id == prod.id).stock = prod.stock;
  });
};

////////////////////// Muestra el aviso de "Producto agregado exitosamente"
// const showToast = (alertOK) => {
//   alertOK.classList.add("active");
//   if (alertOK.classList.contains("active")) {
//     setTimeout(() => {
//       alertOK.classList.remove("active");
//     }, 500);
//   }
// };

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

  localStorage.setItem("cart", JSON.stringify(cart));
};
