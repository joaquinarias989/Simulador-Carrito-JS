let producto = "";
let precio = 0;
let subtotal = 0;
let total = 0;
let resumen = "";

const mostrarProductos = () => {
  let idProd;

  do {
    idProd = prompt(`¿Qué producto desea llevar?\n
            A) Remera Nike - $ 2000\n 
            B) Remera Adidas - $ 1800\n 
            C) Pantalon Nike - $ 3500\n 
            D) Campera Umbro - $ 4900`);
    if (
      idProd === "" ||
      (idProd != "A" && idProd != "B" && idProd != "C" && idProd != "D")
    ) {
      alert("Ingrese una opción correcta");
    }
  } while (
    idProd === "" ||
    (idProd != "A" && idProd != "B" && idProd != "C" && idProd != "D")
  );

  switch (idProd) {
    case "A":
      producto = "Remera Nike";
      precio = 2000;
      break;
    case "B":
      producto = "Remera Adidas";
      precio = 1800;
      break;
    case "C":
      producto = "Pantalon Nike";
      precio = 3500;
      break;
    case "D":
      producto = "Campera Umbro";
      precio = 4900;
      break;
  }

  console.log(`Producto: ${producto}`);
  console.log(`Precio: ${precio}`);

  alert(`Usted eligió ${producto}, el mismo cuesta ${precio}`);
  resumen += `<li>${producto}: $ ${precio}</li>`;

  subtotal += precio;
  console.log(`SUBTOTAL: ${subtotal}`);

  preguntarContinuar();
};

const preguntarContinuar = () => {
  let seguirComprando = confirm("¿Desea seguir comprando?");
  if (seguirComprando) mostrarProductos();
  else informarCompra();
};

const informarCompra = () => {
  let iva = subtotal * 0.21;
  total = subtotal + iva;

  console.log(`Iva 21%: ${iva}`);
  console.log(`TOTAL: ${total}`);

  alert(`El total de sus productos es: $ ${subtotal}.\n 
  El IVA cobrado es de: $ ${iva}\n
  El Total de su compra es de: $ ${total}\n
  Gracias por su compra!`);

  document.write(`<h2>RESUMEN:</h2>
  <ol>${resumen}</ol>`);
  document.write(`<h3><span>IVA</span>: $ ${iva}</h3>`);
  document.write(`<h2><span>TOTAL</span>: $ ${total}</h2>`);
  document.write("<h3>Gracias por su compra!</h3>");
};

mostrarProductos();
