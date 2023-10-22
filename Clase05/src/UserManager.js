const { promises: fs } = require("fs");
const { Usuario } = require("./Usuario.js");
const { crearSalt, encriptar } = require("./criptografia.js")

class UserManager {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async registrar({ nombre, apellido, nombreUsuario, contrasenia }) {
    const id = crypto.randomUUID();
    const salt = crearSalt();
    contrasenia = encriptar(contrasenia, salt);
    const nuevoUsuario = new Usuario({
      id,
      nombre,
      apellido,
      nombreUsuario,
      contrasenia,
      salt,
    });
    const usuarios = await this.obtenerUsuarios();
    usuarios.push(nuevoUsuario);
    await fs.writeFile(this.ruta, JSON.stringify(usuarios, null, 2));
    return nuevoUsuario;
  }

  async loguear({ nombreUsuario, contrasenia }) {
    const usuarios = await this.obtenerUsuarios();
    const buscado = usuarios.find((u) => u.nombreUsuario === nombreUsuario);

    if (!buscado) {
      throw new Error("Credenciales invalidas");
    }

    const contraseniaRecibidaEncriptada = encriptar(contrasenia, buscado.salt);
    if (buscado.contrasenia !== contraseniaRecibidaEncriptada) {
      throw new Error("Credenciales invalidas");
    }

    return buscado;
  }

  async obtenerUsuarios() {
    const usuariosString = await fs.readFile(this.ruta, "utf-8");
    const usuariosObjeto = JSON.parse(usuariosString);
    return usuariosObjeto;
  }
}
exports.UserManager = UserManager;
