////////////////////// CLASES

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

////////////////////// Variables, Arrays, DOM

let usuarios = [usuario1, usuario2];
let productos = [prod1, prod2, prod3, prod4];
let carrito = [];

let usuarioLogueado = "";
const datoEmail = document.getElementById("email");
const datoNombre = document.getElementById("name");

let envio = 500;
let subtotal = 0;
let total = 0;

const envioCarritoHtml = document.getElementById("ship-cart");
const envioDatoHtml = document.getElementById("ship-data");
const subtotalHtml = document.getElementById("subtotal");
const totalHtml = document.getElementById("total");

const listaCarrito = document.querySelector(".cart__resume__products");
const productoCarrito = document.getElementById("template-product").content;
const fragmento = document.createDocumentFragment();

////////////////////// Funcion que inicia el programa

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
      alert(
        "Ha superado el límite de intentos para iniciar sesión. Reintente en unos minutos"
      );
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

////////////////////// Login

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
    user === "" ||
    (user != usuarios[0].id && user != usuarios[1].id && user != "NUEVO")
  );

  switch (user) {
    case usuarios[0].id:
      for (let i = 1; i <= 3; i++) {
        pass = prompt(`${usuarios[0].nombre} ingresa tu contraseña:`);
        if (pass != usuarios[0].contraseña && i < 3)
          alert("Contraseña incorrecta. Intente nuevamente.");
        else if (pass != usuarios[0].contraseña && i == 3) return false;
        else {
          usuarioLogueado = usuarios[0].nombre;
          datoNombre.value = usuarios[0].nombre;
          datoEmail.value = usuarios[0].email;
          return true;
        }
      }
      return false;

    case usuarios[1].id:
      for (let i = 1; i <= 3; i++) {
        pass = prompt(`${usuarios[1].nombre} ingresa tu contraseña:`);
        if (pass != usuarios[1].contraseña && i < 3)
          alert("Contraseña incorrecta. Intente nuevamente.");
        else if (pass != usuarios[1].contraseña && i == 3) return false;
        else {
          usuarioLogueado = usuarios[1].nombre;
          datoNombre.value = usuarios[1].nombre;
          datoEmail.value = usuarios[1].email;
          return true;
        }
      }
      return false;

    case "NUEVO":
      let idNuevoUsuario = "";
      let nombreNuevoUsuario = "";
      let emailNuevoUsuario = "";
      let passwNuevoUsuario = "";

      do {
        idNuevoUsuario = prompt(
          "Ingrese un identificador/apodo de su Usuario"
        ).toUpperCase();
        if (
          idNuevoUsuario.trim().length < 2 ||
          idNuevoUsuario.trim().length > 5
        )
          alert("Ingrese ente 2 y 5 caracteres");
        else if (!isNaN(idNuevoUsuario)) alert("Ingrese letras y/o números");
      } while (
        idNuevoUsuario.trim().length < 2 ||
        idNuevoUsuario.trim().length > 5 ||
        !isNaN(idNuevoUsuario)
      );

      do {
        nombreNuevoUsuario = prompt("Ingrese su Nombre completo:");
        if (
          nombreNuevoUsuario.trim().length < 2 ||
          nombreNuevoUsuario.trim().length > 50
        )
          alert("Ingrese ente 2 y 50 letras");
        else if (!isNaN(nombreNuevoUsuario)) alert("Ingrese sólo letras");
      } while (
        nombreNuevoUsuario.trim().length < 2 ||
        nombreNuevoUsuario.trim().length > 50 ||
        !isNaN(nombreNuevoUsuario)
      );

      do {
        emailNuevoUsuario = prompt("Email:");
        if (!emailNuevoUsuario.includes("@")) alert("Ingrese un email válido");
      } while (!emailNuevoUsuario.includes("@"));

      do {
        passwNuevoUsuario = prompt("Contraseña:");
        if (passwNuevoUsuario.trim().length < 3)
          alert("ingrese como mínimo 3 caracteres");
      } while (passwNuevoUsuario.trim().length < 3);

      const nuevoUsuario = new Usuario(
        idNuevoUsuario,
        nombreNuevoUsuario,
        emailNuevoUsuario,
        passwNuevoUsuario
      );
      usuarios.push(nuevoUsuario);
      console.log(
        `Bienvenido: ${usuarios[usuarios.length - 1].id} - ${
          usuarios[usuarios.length - 1].nombre
        }`
      );
      usuarioLogueado = usuarios[usuarios.length - 1].nombre;
      datoNombre.value = usuarios[usuarios.length - 1].nombre;
      datoEmail.value = usuarios[usuarios.length - 1].email;
      return true;
  }
};

////////////////////// Muestra los productos disponibles al usuario (mediante Prompt)

const mostrarProductos = () => {
  let idProd;
  let agregaProd = true;

  do {
    idProd = prompt(`Hola ${usuarioLogueado} ¿qué producto deseas llevar?\n
            A) ${productos[0].nombre} - Talle ${productos[0].talle} - $ ${productos[0].precio} - Stock: ${productos[0].stock}\n
            B) ${productos[1].nombre} - Talle ${productos[1].talle} - $ ${productos[1].precio} - Stock: ${productos[1].stock}\n
            C) ${productos[2].nombre} - Talle ${productos[2].talle} - $ ${productos[2].precio} - Stock: ${productos[2].stock}\n
            D) ${productos[3].nombre} - Talle ${productos[3].talle} - $ ${productos[3].precio} - Stock: ${productos[3].stock}\n
            `);

    if (idProd == null) {
      alert("Elija un producto por favor");
    } else {
      idProd = idProd.toUpperCase().trim();
      if (
        idProd === "" ||
        (idProd != "A" && idProd != "B" && idProd != "C" && idProd != "D")
      )
        alert("Ingrese una opción correcta");
    }
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

    subtotal += carrito[carrito.length - 1].precio;

    alert(
      `Usted eligió ${carrito[carrito.length - 1].nombre}, el mismo cuesta $ ${
        carrito[carrito.length - 1].precio
      }\n
      SUBTOTAL: $ ${subtotal}`
    );

    console.log(`SUBTOTAL: ${subtotal}`);
  }

  preguntarContinuar();
};

////////////////////// Pregunta si desea seguir comprando

const preguntarContinuar = () => {
  let seguirComprando = confirm("¿Desea seguir comprando?");
  seguirComprando ? mostrarProductos() : informarCompra();
};

////////////////////// Itera el carrito en HTML

const informarCompra = () => {
  alert(
    `¡Gracias ${usuarioLogueado} por elegirnos! A continuación, se procederá a mostrar el Resumen de sus productos. Por favor, rellene toda la información requerida para seguir con la compra.\n`
  );

  carrito.forEach((prod) => {
    productoCarrito.querySelector(".cart__product #product__name").textContent =
      prod.nombre;
    productoCarrito.querySelector(
      ".cart__product p"
    ).textContent = `${prod.color}, ${prod.talle}`;
    productoCarrito.querySelector(
      ".cart__product #price"
    ).textContent = `$ ${prod.precio}`;

    const clone = productoCarrito.cloneNode(true);
    fragmento.appendChild(clone);
  });
  listaCarrito.appendChild(fragmento);

  total = subtotal + envio;

  console.log(`Costo de Envío: ${envio}`);
  console.log(`TOTAL: ${total}`);
  envioDatoHtml.textContent = `$ ${envio}`;
  envioCarritoHtml.textContent = `$ ${envio}`;
  subtotalHtml.textContent = `$ ${subtotal}`;
  totalHtml.textContent = `$ ${total}`;
};

init();
