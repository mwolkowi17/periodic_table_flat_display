import { display } from "./display.js";

export function scalingDisplay(stringLenght){
if(stringLenght<600){
    display.style.height="320px";
    console.log("new height");
}
if(stringLenght>700 && stringLenght<1100){
   display.style.height="420px";
   console.log("new height2");
}
}