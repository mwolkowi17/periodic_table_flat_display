import { table } from "./data.js";



export function szuk(a){
    const wynik = table.filter(element => element ===a);
    console.log(wynik);
  }