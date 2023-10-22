// METODO INCLUDES:

// const p1 = { nombre: "p1", edad: 25 };
// const p2 = { nombre: "p2", edad: 21 };
// const p3 = { nombre: "p3", edad: 24 };
// const p4 = { nombre: "p4", edad: 29 };
// const p5 = { nombre: "p5", edad: 27 };

// const personas = [p1,p2,p3,p4,p5];

// para saber el indice de un elemento:

// for(const [indice, persona] of Object.entries(personas)){
//   console.log(`en el indice ${indice} se encuentra la persona ${persona.nombre}`)
// }

// for(let i=0; i < personas.length; i++){
//   const persona = personas[i];
//   console.log(`en pos ${i} esta ${persona.nombre}`)
// }

// console.log(personas.map(p => p.edad).includes(20));

// const array = personas.map(p => p.edad);
// console.log(array);

//********************************************************************************** */

// METODOS DE OBJETOS

const auto = { marca: "ford", color: "gris", puertas: 5 };

// console.log(Object.keys(auto))
// console.log(Object.values(auto))
// console.log(Object.entries(auto))

//****************************************************************************** */

// ASYNC / AWAIT:

// fetch('https://jsonplaceholder.typicode.com/todos/1')
// .then(response => response.json())
// .then(data => console.log(data));

// async function fetch() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
//   const objetoJS = await response.json();
//   console.log(objetoJS);
// }

// fetch()

/* async function obtenerProductos() {
    try{
        const respuesta = await fetch("https://fakestoreapi.com/products")
        if(!respuesta.ok){
            throw new Error("No se pudo abrir la lista de productos")
        }
        const datos = await respuesta.json();
        return datos
    } catch(error){
        console.log(error)
        return []
    }    
}

async function procesarProductos(){
    try{
        const productos = await obtenerProductos();
        if(productos.length === 0) {
            console.log("No se encontraron productos")
            return;
        }
        const arregloPorductos = []
        productos.forEach((item)=> {
            arregloPorductos.push(item)
        })

        let encontrado = arregloPorductos.find((item)=> item.id === 9);
        console.log(encontrado)

    } catch(error){
        console.log(error)
    }
}

procesarProductos() */

//********************************************************************************** */

// SPREAD / REST:

// const nums = [1,2,3,4,5]

// function sumar(n1,n2, n3,...resto){
//   console.log(n1+n2+n3)
//   console.log(resto)
// }

// sumar(1,2,3,4,5,6,7,8,9)

//  TRIM:

// const mensaje = "               hola              mundo          ";
// console.log(mensaje)
// console.log(mensaje.trim())

// FLAT:

// const arrayAnidado = [1,32,4,5,6,[1,4,5,1],[3411,4,3]];
// console.log(arrayAnidado)
// console.log("")
// console.log(arrayAnidado.flat());

//NULISH COALESCENSE:  ??

//MIEMBROS DE CLASE PRIVADA

// class Persona {
//   nombre;
//   #edad;
//   constructor(nombre, edad) {
//     this.nombre = nombre;
//     this.setEdad(edad); // utiliza la validacion del setter.
//   }

//   getEdad() {
//     return this.#edad;
//   }

//   setEdad(valor) {
//     if (Number.isInteger(valor) && valor >= 0) {
//       this.#edad = valor;
//     } else {
//       console.log("valor incorrecto");
//     }
//   }
// }

// const p = new Persona("gonzalo", 41);
// console.log(p);

//---------------------------------------------------------------------------------------------------

//MANEJO DE ERRORES:

// function divisionEntera(dividendo, divisor) {
//   if (divisor === 0) {
//     throw new Error("No se puede dividir por cero");
//   }

//   const cociente = Math.floor(dividendo / divisor);
//   const resto = dividendo % divisor;

//   return {
//     cociente,
//     resto,
//   };
// }

// try {
//   const result = divisionEntera(10, 0);
//   console.log(result);
// } catch (error) {
//   console.log(error.message)
// }

// const resultado = divisionEntera(10, 3);
// console.log(resultado);

//--------------------------------------------------------------

// function divisionEntera(dividendo, divisor, callback) {
//   if (divisor === 0) {
//     return callback(new Error("No se puede dividir por cero"), null);
//   }
//   const cociente = Math.floor(dividendo / divisor);
//   const resto = dividendo % divisor;
//   return callback(null, { cociente, resto });
// }

// function manejarResultadoDivision(error, result) {
//   if (error) {
//     console.log(error.message);
//   } else {
//     console.log(result);
//   }
// }

// divisionEntera(10,0,manejarResultadoDivision);

//----------------------------------------------------------------------------------

const { promises: fs } = require("fs");

class Product {
  constructor(title, description, price, thumbnail, stock, code, id) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.stock = stock;
    this.code = code;
    this.id = id;
  }
}

class ProductManager {
  static lastId = 0;
  static lastCode = 0;

  constructor(ruta) {
    this.products = [];
    this.ruta = ruta;
  }

  static getId() {
    return ++ProductManager.lastId;
  }

  static getCode() {
    return (ProductManager.lastCode += Math.random());
  }

  async init() {
    await this.escribirArchivo();
  }

  async escribirArchivo() {
    await fs.writeFile(this.ruta, JSON.stringify(this.products));
  }

  async leerArchivo() {
    const products = await fs.readFile(this.ruta, "utf-8");
    this.products = JSON.parse(products);
    return this.products;
  }

  async addProduct({ title, description, price, thumbnail, stock }) {
    if (!title || !description || !price || !thumbnail || !stock) {
      throw new Error("Debe completar todos los campos.");
    }

    const code = ProductManager.getCode();
    const productoExistente = this.products.find((p) => p.code === code);

    if (!productoExistente) {
      const id = ProductManager.getId();
      const product = new Product(
        title,
        description,
        price,
        thumbnail,
        stock,
        code,
        id
      );
      await this.leerArchivo();
      this.products.push(product);
      await this.escribirArchivo();
      return product;
    } else {
      console.log(
        "Existe un producto con el mismo codigo en la coleccion. Por favor Ingresar uno nuevo"
      );
    }
  }

  async getProducts() {
    const listaProductos = await this.leerArchivo();
    return listaProductos;
  }

  async getproductById(id) {
    await this.leerArchivo();
    const existe = this.products.find((p) => p.id === id);
    if (existe) {
      return existe;
    } else {
      console.log("No se encuentra en la coleccion");
    }
  }

  async updateProduct(id, datoActualizado) {
    await this.leerArchivo();
    const indiceProducto = this.products.findIndex((p) => p.id === id);
    if (indiceProducto !== -1) {
      const productoActualizado = {
        ...this.products[indiceProducto],
        ...datoActualizado,
      };
      this.products[indiceProducto] = productoActualizado;
      await this.escribirArchivo();
      return productoActualizado;
    } else {
      console.log("Producto no encontrado");
    }
  }

  async deleteProduct(id) {
    const item = await this.getproductById(id);
    const nuevoArreglo = this.products.filter((p) => p.id !== item.id);
    await fs.unlink(this.ruta);
    await this.init();
    await this.leerArchivo();
    this.products = nuevoArreglo;
    await this.escribirArchivo();
  }
}

async function main() {
  const instancia = new ProductManager("productos.txt");
  await instancia.init();

  await instancia.addProduct({
    title: "guitarra",
    description: "Ibanez",
    price: 450,
    thumbnail: "url",
    stock: 3,
  });

  await instancia.addProduct({
    title: "bajo",
    description: "fender",
    price: 800,
    thumbnail: "url",
    stock: 7,
  });

  await instancia.addProduct({
    title: "guitarra",
    description: "gibson",
    price: 1200,
    thumbnail: "url",
    stock: 6,
  });

  const products = await instancia.getProducts();
  console.log(products);

  await instancia.updateProduct(2, {
    title: "piano",
    description: "electrico",
    price: 7500,
    thumbnail: "url",
    stock: 1,
  });

  console.log(await instancia.getProducts());

  const elemento = await instancia.getproductById(2);
  console.log(elemento);

  await instancia.deleteProduct(2)
  console.log(await instancia.getProducts())

}

main();
