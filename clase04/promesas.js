
const p = new Promise((resolve, reject) => {
  let pizzaOk = false;
  let heladoOk = false;
  console.log("Pido la pizza")
  setTimeout(() => {
    console.log("llego la pizza");
    pizzaOk = true;
    if(pizzaOk && heladoOk){
      resolve("ya esta toda la comida")
    }
  }, 1000 * Math.floor(Math.random() * 3 + 1));

  console.log("Pido el helado")
  setTimeout(() => {
    console.log("llego el helado");
    heladoOk = true;
    if(pizzaOk && heladoOk){
      resolve("ya esta toda la comida")
    }
  }, 1000 * Math.floor(Math.random() * 3 + 1));
})

p.then((resultadoDeLaPromesa)=> {
  console.log(resultadoDeLaPromesa);
  console.log("Llamo a mis amigos")
  setTimeout(()=>{
    console.log("Llego la gente")
  }, 1000 * Math.floor(Math.random() * 3 + 1))
})
