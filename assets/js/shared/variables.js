////////////////////// Arrays, Variables,  DOM
let user = JSON.parse(localStorage.getItem("user")) ?? {};
let cart = JSON.parse(localStorage.getItem("cart")) ?? [];
let products = [];

let subtotal = 0;
let total = 0;
let totalQuantity = 0;
let ship = 475;

const subtotalHtml = document.getElementById("subtotal");
const totalHtml = document.getElementById("total");

const listCart = document.querySelector(".cart__resume__products");
const templateProductCart = document.getElementById("product-cart").content;

const fragment = document.createDocumentFragment();
