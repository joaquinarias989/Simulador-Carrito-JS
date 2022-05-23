const listProducts = document.querySelector(".products__list");
const templateProduct = document.getElementById("product-card").content;

////////////////////// Lógica de los Filtros
const filterGroup = document.querySelector(".filter");
const inputSearch = filterGroup.querySelector(".form__input");
inputSearch.addEventListener("input", () => showProducts(inputSearch.value));

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
    // showProducts();
    return;
  }

  prod.stock -= 1;
  prod.cantidad += 1;

  if (cart.some((p) => p.id == prod.id)) {
    let indice = cart.findIndex((index) => index.id == prod.id);
    cart[indice].cantidad = prod.cantidad;
    cart[indice].stock = prod.stock;
  } else {
    // cart.push(prod);
    cart = [...cart, prod];
  }

  // showProducts();
  Toastify({
    text: "Producto agregado con éxito!",
    className: "info",
    duration: 1500,
    stopOnFocus: false,
    offset: {
      y: "7rem",
    },
  }).showToast();
  updateTotal();
};

//////////////////////
////////////////////// Función principal - Inicializa el programa
//////////////////////

const init = () => {
  try {
    document.addEventListener("DOMContentLoaded", (e) => {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        updateProds();
        updateTotal();
      }
      showProducts();
    });
  } catch (error) {
    Swal.fire({
      text: error,
      icon: "error",
      confirmButtonText: "OK",
      iconColor: "#ffda07",
    });
  }
};

init();
