class Usuario {
  constructor(nombre, email, contraseña, codpostal, provincia, domicilio) {
    this.nombre = nombre;
    this.email = email;
    this.contraseña = contraseña;
    this.codpostal = codpostal;
    this.provincia = provincia;
    this.domicilio = domicilio;
  }
}

////////////////////// Usuarios de prueba

const usuario1 = new Usuario(
  "Joaquin Arias",
  "joaquinarias989@gmail.com",
  "12345",
  "5000",
  "CBA",
  "Paso de los Andes 285"
);

let users = [usuario1];
