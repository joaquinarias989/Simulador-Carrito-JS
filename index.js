let usuarioLogueado = "";
let precio = 0;
let subtotal = 0;
let total = 0;
let resumenHtml = "";

class Usuario {
  constructor(id, nombre, email, contraseña) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.contraseña = contraseña;
  }
}

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

class Producto {
  constructor(nombre, precio, descripcion, color, talle, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.color = color;
    this.talle = talle;
    this.stock = stock;
  }
}

const prod1 = new Producto(
  "Remera Phenomenally",
  2380,
  "Lorem ipsum dolor",
  "Negro",
  "M",
  2
);
const prod2 = new Producto(
  "Remera Risks & Dreams",
  2499,
  "Lorem ipsum dolor",
  "Amarillo",
  "XL",
  3
);
const prod3 = new Producto(
  "Buzo Chineze",
  4630,
  "Lorem ipsum dolor",
  "Negro",
  "L",
  2
);
const prod4 = new Producto(
  "Jacket Bomber",
  3700,
  "Lorem ipsum dolor",
  "Negro",
  "S",
  2
);

let usuarios = [usuario1, usuario2];
let productos = [prod1, prod2, prod3, prod4];
let carrito = [];

const init = () => {
  let user;

  do {
    user = prompt(`Bienvenido!\n 
    Si eres Cliente pulsa 1\n
    Si eres Administrador pulsa 2\n`);
    if (user != 1 && user != 2) alert("Ingrese una opción correcta");
  } while (user != 1 && user != 2);

  if (user == 1) {
    if (sign() == true) {
      console.log("-----RESUMEN-----");
      mostrarProductos();
    } else {
      alert("Contraseña incorrecta");
    }
  } else if (user == 2) {
    alert(
      "El Administrador de Productos se encuentra en mantenimiento. Disculpe las molestias.-"
    );
    // let passwordAdm;
    // do {
    //   passwordAdm = prompt(`-Administrador de Productos-\n
    // Ingrese la contraseña:\n`);
    //   if (passwordAdm != "1") alert("Contraseña incorrecta");
    // } while (passwordAdm != "1");
    // administrarProductos();
  }
};

const sign = () => {
  let user;
  let pass;

  do {
    user = prompt(`Elija su usuario:\n
     ${usuarios[0].id}) - ${usuarios[0].nombre}\n
     ${usuarios[1].id}) - ${usuarios[1].nombre}\n
     NUEVO) - Crear nuevo Usuario\n
    `).toUpperCase();
  } while (
    user == "" ||
    (user != usuarios[0].id && user != usuarios[1].id && user != "NUEVO")
  );

  switch (user) {
    case usuarios[0].id:
      pass = prompt(`${usuarios[0].nombre} ingresa tu contraseña:`);
      if (pass != usuarios[0].contraseña) return false;
      else {
        usuarioLogueado = usuarios[0].nombre;
        return true;
      }
    case usuarios[1].id:
      pass = prompt(`${usuarios[1].nombre} ingresa tu contraseña:`);
      if (pass != usuarios[1].contraseña) return false;
      else {
        usuarioLogueado = usuarios[1].nombre;
        return true;
      }
    case "NUEVO":
      const nuevoUsuario = new Usuario(
        prompt("Ingrese un identificador de su Usuario").toUpperCase(),
        prompt("Ingrese su Nombre completo:"),
        prompt("Email:"),
        prompt("Contraseña:")
      );
      usuarios.push(nuevoUsuario);
      console.log(
        `Bienvenido: ${usuarios[usuarios.length - 1].id} - ${
          usuarios[usuarios.length - 1].nombre
        }`
      );
      usuarioLogueado = usuarios[usuarios.length - 1].nombre;
      return true;
  }
};

const mostrarProductos = () => {
  let idProd;
  let agregaProd = true;

  do {
    idProd = prompt(`Hola ${usuarioLogueado} ¿qué producto deseas llevar?\n
            A) ${productos[0].nombre} - Talle ${productos[0].talle} - $ ${productos[0].precio} - Stock: ${productos[0].stock}\n 
            B) ${productos[1].nombre} - Talle ${productos[1].talle} - $ ${productos[1].precio} - Stock: ${productos[1].stock}\n 
            C) ${productos[2].nombre} - Talle ${productos[2].talle} - $ ${productos[2].precio} - Stock: ${productos[2].stock}\n 
            D) ${productos[3].nombre} - Talle ${productos[3].talle} - $ ${productos[3].precio} - Stock: ${productos[3].stock}\n
            `).toUpperCase();
    if (
      idProd === "" ||
      (idProd != "A" && idProd != "B" && idProd != "C" && idProd != "D")
    )
      alert("Ingrese una opción correcta");
  } while (
    idProd === "" ||
    (idProd != "A" && idProd != "B" && idProd != "C" && idProd != "D")
  );

  if (idProd == "A" && productos[0].stock > 0) {
    carrito.push(productos[0]);
    productos[0].stock -= 1;
  } else if (idProd == "B" && productos[1].stock > 0) {
    carrito.push(productos[1]);
    productos[1].stock -= 1;
  } else if (idProd == "C" && productos[2].stock > 0) {
    carrito.push(productos[2]);
    productos[2].stock -= 1;
  } else if (idProd == "D" && productos[3].stock > 0) {
    carrito.push(productos[3]);
    productos[3].stock -= 1;
  } else {
    alert("No tenemos stock del producto seleccionado. Disculpe.-");
    agregaProd = false;
  }

  if (agregaProd == true) {
    console.log(`Producto: ${carrito[carrito.length - 1].nombre}`);
    console.log(`Precio: ${carrito[carrito.length - 1].precio}`);

    alert(
      `Usted eligió ${carrito[carrito.length - 1].nombre}, el mismo cuesta ${
        carrito[carrito.length - 1].precio
      }`
    );

    subtotal += carrito[carrito.length - 1].precio;
    console.log(`SUBTOTAL: ${subtotal}`);

    resumenHtml += `<li>${carrito[carrito.length - 1].nombre}: $ ${
      carrito[carrito.length - 1].precio
    }</li>`;
  }

  preguntarContinuar();
};

const preguntarContinuar = () => {
  let seguirComprando = confirm("¿Desea seguir comprando?");
  seguirComprando ? mostrarProductos() : informarCompra();
};

const informarCompra = () => {
  let carritoResumen = "";
  for (let ite of carrito) {
    carritoResumen += `${ite.nombre} - ${ite.precio}\n`;
  }
  let iva = subtotal * 0.21;
  total = subtotal + iva;

  console.log(`Iva 21%: ${iva}`);
  console.log(`TOTAL: ${total}`);

  alert(`RESUMEN:\n
  ${carritoResumen}
  SUBTOTAL: $ ${subtotal}.\n 
  Iva: $ ${iva}\n
  TOTAL: $ ${total}\n
  ¡Gracias ${usuarioLogueado} por comprar en STREETWEAR!\n`);

  document.write(`<h2>RESUMEN:</h2>
  <ul>${resumenHtml}</ul>`);
  document.write(`<h3><span>IVA</span>: $ ${iva}</h3>`);
  document.write(`<h2><span>TOTAL</span>: $ ${total}</h2>`);
  document.write("<h3>Gracias por su compra!</h3>");
};

init();
