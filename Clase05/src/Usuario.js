

class Usuario {
  constructor({ id, nombre, apellido, nombreUsuario, contrasenia, salt }) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.nombreUsuario = nombreUsuario;
    this.contrasenia = contrasenia;
    this.salt = salt;
  }
}
exports.Usuario = Usuario;
