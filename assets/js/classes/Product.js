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

let products = [];
