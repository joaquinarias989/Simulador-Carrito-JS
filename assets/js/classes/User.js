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

if (localStorage.getItem("user")) {
  let userRegistered = JSON.parse(localStorage.getItem("user"));

  if (!users.find((u) => u.email === userRegistered.email)) {
    const newUser = new Usuario(
      userRegistered.nombre,
      userRegistered.email,
      userRegistered.contraseña,
      userRegistered.codpostal,
      userRegistered.provincia,
      userRegistered.domicilio
    );
    users.push(newUser);
  }
}
