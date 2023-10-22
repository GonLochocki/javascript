const { UserManager } = require("./UserManager.js");

async function main() {
  const um = new UserManager("./clase05/db/usuarios.json");
  console.log(await um.obtenerUsuarios());
  await um.registrar({
    nombre: "Gonzalo",
    apellido: "Lochocki",
    nombreUsuario: "Goncho",
    contrasenia: "123",
  });
  console.log(await um.obtenerUsuarios());
  const usuarioLogueado = await um.loguear({nombreUsuario: "Goncho", contrasenia: "123"})
  console.log(usuarioLogueado)

  try{
    um.loguear({nombreUsuario: "Goncho", contrasenia: "jkl"})
  }catch(error){
    console.log(error.message)
  }

  try{
    um.loguear({nombreUsuario: "Gho", contrasenia: "123"})
  }catch(error){
    console.log(error.message)
  }
}

main();
