import * as axios from 'axios';

const number = 1
let wynik = [];
let checkGet=false;
export async function getData(i) {
  //await axios.get('/element/1.json')
  for (let i=1; i < 119; i++){
  await axios.get('/element/'+i+'.json')
    .then(function (response) {
      // handle success
      //console.log(response);
      //console.log(response.status);
      //wynik=response.status;
      
        wynik.push(response.data.element.BriefDescription);
        
     
      //console.log(wynik[0]);





    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }
  return wynik[i];
}
export const newwynik = getData()
//let text='';
//text=wynik[0]
//text.replace('<p>','');
//console.log(text);