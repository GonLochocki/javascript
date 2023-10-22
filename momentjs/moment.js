const moment = require("moment");

const hoy = moment();
const fechaDeNacimiento = moment("1982-08-16", "YYYY-MM-DD");

console.log(hoy)
console.log(fechaDeNacimiento)

if(fechaDeNacimiento.isValid()){
    console.log(`Desde mi nacimiento han pasado ${hoy.diff(fechaDeNacimiento, "days")} dias`)
}else{
    console.log("La fecha es invalida");
}