import * as axios from 'axios';

const number = 1
let wynik = [];

export async function getData() {
  //await axios.get('/element/1.json')
  for (let i=1; i < 119; i++){
  await axios.get('/element/'+i+'.json')
    .then(function (response) {
      // handle success
      //console.log(response);
      //console.log(response.status);
      //wynik=response.status;
      wynik.push(response.status)
      console.log(wynik[0]);





    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }
  return wynik;
}
export const newwynik = getData()
console.log(wynik);