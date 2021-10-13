export const display = document.createElement('div');
display.className = 'display';
display.id = 'display';
display.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';
display.textContent = "Element name";
display.style.height = "200px";
display.style.width = "400px";
display.style.fontSize = "30px";
display.style.textAlign = "center";
display.style.lineHeight = "1.8";

export const atomicnumber = document.createElement('div');
atomicnumber.className = "atomicnumber";
atomicnumber.textContent = "atomic weight:";
atomicnumber.style.fontSize = "20px";


export const atomicRealNumber = document.createElement('div');
atomicRealNumber.className = "atomicrealnumber";
atomicRealNumber.textContent = "atomic number:";
atomicRealNumber.style.fontSize = "20px";

display.appendChild(atomicRealNumber);
display.appendChild(atomicnumber);
