// ASINCRONICO

// const fs = require("fs")

// const ruta = "prueba.txt"

// // Create

// fs.writeFileSync(ruta, "Hola Mundo!")

// // Read

// console.log( fs.readFileSync(ruta, "utf-8"))

//  // Update

//   fs.writeFileSync(ruta, "hola Coderitos")
//   console.log( fs.readFileSync(ruta, "utf-8"))
//   fs.appendFileSync(ruta, "!!")
//   console.log( fs.readFileSync(ruta, "utf-8"))

//  // Delete

//   fs.unlinkSync(ruta)

// ---------------------------------------------------------------------------------------- //

/*const {promises: fs} = require("fs");
const ruta = "prueba.txt";

async function main() {
  try {
    await fs.writeFile(ruta, "Hola Mundo!");
  } catch (error) {
    console.log(error.message);
  }

  try {
    console.log(await fs.readFile(ruta, "utf-8"));
  } catch (error) {
    console.log(error.message);
  }
  try {
    await fs.writeFile(ruta, "Premium");
    console.log(await fs.readFile(ruta, "utf-8"));
    await fs.appendFile(ruta, "!!! maestrooo!!!");
    console.log(await fs.readFile(ruta, "utf-8"));
  } catch (error) {
    console.log(error.message);
  }

  try {
   await fs.unlink(ruta);
    console.log("Archivo Borrado");
  } catch (error) {
    console.log(error.message);
  }
}

main();*/

//--------------------------------------------------------------------------------------------------------------

const { promises: fs } = require("fs");

class Usuario {
  constructor({ nombre, apellido, edad, curso, id }) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.curso = curso;
    this.id = id;
  }
}

class UsuariosManager {
  #usuarios;
  static #ultimoId = 1;
  constructor({ ruta }) {
    this.ruta = ruta;
    this.#usuarios = [];
  }

  static #generarId() {
    return UsuariosManager.#ultimoId++;
  }
  async init() {
    this.escribirUsuarios();
  }

  async escribirUsuarios() {
    await fs.writeFile(this.ruta, JSON.stringify(this.#usuarios));
  }

  async leerUsuarios() {
    const usuariosEnJson = await fs.readFile(this.ruta, "utf-8");
    this.#usuarios = JSON.parse(usuariosEnJson);
  }

  async addUser({ nombre, apellido, edad, curso }) {
    const id = UsuariosManager.#generarId();
    const usuario = new Usuario({ nombre, apellido, edad, curso, id });
    await this.leerUsuarios();
    this.#usuarios.push(usuario);
    await this.escribirUsuarios();
    return usuario;
  }
  async getUsers() {
    await this.leerUsuarios();
    return this.#usuarios;
  }

  async updateUsers() {
    const index = findIndex();
  }
}

async function main() {
  const um = new UsuariosManager({ ruta: "usuarios.txt" });
  await um.init();
  await um.addUser({
    nombre: "Gonzalo",
    apellido: "Lochocki",
    edad: 41,
    curso: "Backend",
  });
  await um.addUser({
    nombre: "Liam",
    apellido: "Lochocki",
    edad: 24,
    curso: "React",
  });

  await um.addUser({
    nombre: "Anahi",
    apellido: "Torres",
    edad: 43,
    curso: "Javascript",
  });

  console.log(await um.getUsers());
}

main();

// const fs = require("fs");
// const ruta = "prueba.txt";

// function main() {
//   fs.writeFile(ruta, "Hola Mundo", (error, result) => {
//     if (error) {
//       console.log(error.message);
//     } else {
//       console.log("Salio bien: escritura");
//     }
//   });

//   fs.readFile(ruta, "utf-8", (error, result) => {
//     if (error) {
//       console.log(error.message);
//     } else {
//       console.log("Salio bien: lectura");
//       console.log(result);
//     }
//   });

//   fs.writeFile(ruta, "Premium", (error, result) => {
//     if (error) {
//       console.log(error.message);
//     } else {
//       console.log("Salio bien: modificado");
//     }
//   });

//   fs.readFile(ruta, "utf-8", (error, result) => {
//     if (error) {
//       console.log(error.message);
//     } else {
//       console.log("Salio bien: lectura");
//       console.log(result);
//     }
//   });

//   fs.appendFile(ruta, "mmmmmmm!!!!!!!!!", (error, result) => {
//     if (error) {
//       console.log(error.message);
//     } else {
//       console.log("Salio bien: agregado");
//     }
//   });
//   fs.readFile(ruta, "utf-8", (error, result) => {
//     if (error) {
//       console.log(error.message);
//     } else {
//       console.log(result);
//     }
//   });

//   fs.unlink(ruta, (error, result) => {
//     if (error) {
//       console.log(error.message);
//     } else {
//     }
//   });
// }
