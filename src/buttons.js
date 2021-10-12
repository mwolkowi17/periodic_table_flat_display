import { display_value } from "./index.js";


export let display_value2;
export const hbutton = document.getElementById( 'H' );

hbutton.addEventListener('click', function() {
  console.log("h button");
  display_value2="H";
  console.log(display_value2);
} );
