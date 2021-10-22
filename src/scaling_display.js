import { display,objectdisplay } from "./display.js";
import { display_tween } from "./index.js";

export function scalingDisplay(stringLenght){
if(stringLenght>600){
    display.style.height=(stringLenght/1.7).toString()+'px';
    console.log("new height");
    display_tween(-500, -10, -1000, 2000)
    //objectdisplay.position.set(-500, 0, -1500);
    if(stringLenght>1150){
        display.style.height=(stringLenght/2).toString()+'px';
        console.log('high');
    }
}

else{
    display.style.height = "360px";
    display_tween(-500, 100, -1000, 2000)
}
   

}