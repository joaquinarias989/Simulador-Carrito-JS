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
    cantidad,
    categoria
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
    this.categoria = categoria;
  }
}

////////////////////// Productos de prueba

// const prod1 = new Producto(
//   "RMPN",
//   "Remera Phenomenally",
//   2380,
//   "Lorem ipsum dolor",
//   "Negro",
//   "M",
//   2,
//   "../img/shirt-yellow.webp",
//   0,
//   "Remeras"
// );
// const prod2 = new Producto(
//   "RRDA",
//   "Remera Risks and Dreams",
//   2499,
//   "Lorem ipsum dolor",
//   "Amarillo",
//   "XL",
//   3,
//   "../img/tshirt-2.webp",
//   0,
//   "Remeras"
// );
// const prod3 = new Producto(
//   "BCN",
//   "Buzo Chineze",
//   4630,
//   "Lorem ipsum dolor",
//   "Negro",
//   "L",
//   2,
//   "../img/buzo.webp",
//   0,
//   "Buzos"
// );
// const prod4 = new Producto(
//   "JBN",
//   "Jacket Bomber",
//   5500,
//   "Lorem ipsum dolor",
//   "Negro",
//   "S",
//   2,
//   "../img/campera.webp",
//   0,
//   "Camperas"
// );

let products = [];
