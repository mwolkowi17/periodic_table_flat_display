import { CSS3DRenderer, CSS3DObject } from '../node_modules/three/examples/jsm/renderers/CSS3DRenderer.js';

export const searcher = document.createElement('div');
searcher.className = 'searcher';
searcher.id = 'searcher';
searcher.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';
searcher.textContent = "Search:";
searcher.style.height = "60px";
searcher.style.width = "300px";

export const searchinput = document.createElement ('input');
searchinput.className = 'searchinput';
searchinput.style.height = "40px";
searchinput.style.width = "125px";

/*export const searchButton = document.createElement('button');
searchButton.className = 'searchButton';
searchinput.style.height = "40px";
searchinput.style.width = "80px";*/

searcher.appendChild(searchinput);
//searcher.appendChild(searchButton);

export const objectsearcher = new CSS3DObject(searcher);

