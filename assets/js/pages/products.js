const listProducts = document.querySelector(".products__list");
const templateProduct = document.getElementById("product-card").content;

////////////////////// Lógica de los Filtros
const filterGroup = document.querySelector(".filter");
const inputSearch = filterGroup.querySelector(".form__input");
inputSearch.addEventListener("input", () => showProducts(inputSearch.value));

//////////////////////
////////////////////// Función principal - Inicializa el programa
//////////////////////
const init = () => {
  try {
    document.addEventListener("DOMContentLoaded", () => {
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
