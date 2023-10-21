const { promises: fs } = require("fs");

class Usuario {
  constructor({ nombre, apellido, username, password }) {
    (this.nombre = nombre),
      (this.apellido = apellido),
      (this.username = username),
      (this.password = password);
  }
}

class UserManager {
  async registrar({ nombre, apellido, username, password }) {
    const usuario = new Usuario({ nombre, apellido, username, password });
  }

  async loguear() {}

  async obtenerUsuarios() {
    const usuariosString = await fs.readFile(this.ruta, "utf-8");
    const usuariosObjeto = JSON.parse(usuariosString);
    return usuariosObjeto;
  }

  constructor(ruta) {
    this.ruta = ruta;
  }
}

const um = new UserManager();
