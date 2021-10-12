
import * as THREE from 'three';
import { TWEEN } from '../node_modules/three/examples/jsm/libs/tween.module.min.js';
import { TrackballControls } from '../node_modules/three/examples/jsm/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from '../node_modules/three/examples/jsm/renderers/CSS3DRenderer.js';
import { table } from './data.js';



let camera, scene, renderer, objectdisplay;
let controls;
let isTable = true;
let displayButton;
export let display_value = "Value";
let display_atomic_number = ' ';
let display_atomic_real_number = '';
//const objectdisplay_s = [];
const objects = [];
const targets = { table: [], sphere: [], helix: [], grid: [], objectdisplay_s: [] };

init();
animate();

//display

const display = document.createElement('div');
display.className = 'display';
display.id = 'display';
display.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';
display.textContent = "Element name";
display.style.height = "200px";
display.style.width = "400px";
display.style.fontSize = "30px";
display.style.textAlign = "center";
display.style.lineHeight = "1.8";

objectdisplay = new CSS3DObject(display);
objectdisplay.position.x = 70;
objectdisplay.position.y = 200;
objectdisplay.position.z = 0;

targets.objectdisplay_s.push(objectdisplay);


const atomicnumber = document.createElement('div');
atomicnumber.className = "atomicnumber";
atomicnumber.textContent = "atomic weight:" + display_atomic_number;
atomicnumber.style.fontSize = "20px";


const atomicRealNumber = document.createElement('div');
atomicRealNumber.className = "atomicrealnumber";
atomicRealNumber.textContent = "atomic number:";
atomicRealNumber.style.fontSize = "20px";
display.appendChild(atomicRealNumber);
display.appendChild(atomicnumber);



function init() {

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 3000;

  scene = new THREE.Scene();





  // table

  for (let i = 0; i < table.length; i += 5) {

    const element = document.createElement('div');
    element.className = 'element';
    element.id = table[i]; // adding id
    element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';

    const number = document.createElement('div');
    number.className = 'number';
    number.textContent = (i / 5) + 1;
    element.appendChild(number);

    const symbol = document.createElement('div');
    symbol.className = 'symbol';
    symbol.textContent = table[i];
    element.appendChild(symbol);

    const details = document.createElement('div');
    details.className = 'details';
    details.innerHTML = table[i + 1] + '<br>' + table[i + 2];
    element.appendChild(details);

    const objectCSS = new CSS3DObject(element);
    objectCSS.position.x = Math.random() * 4000 - 2000;
    objectCSS.position.y = Math.random() * 4000 - 2000;
    objectCSS.position.z = Math.random() * 4000 - 2000;
    scene.add(objectCSS);



    objects.push(objectCSS);

    //

    const object = new THREE.Object3D();
    object.position.x = (table[i + 3] * 140) - 1330;
    object.position.y = - (table[i + 4] * 180) + 990;

    targets.table.push(object);

  }

  // sphere

  const vector = new THREE.Vector3();

  for (let i = 0, l = objects.length; i < l; i++) {

    const phi = Math.acos(- 1 + (2 * i) / l);
    const theta = Math.sqrt(l * Math.PI) * phi;

    const object = new THREE.Object3D();

    object.position.setFromSphericalCoords(800, phi, theta);

    vector.copy(object.position).multiplyScalar(2);

    object.lookAt(vector);

    targets.sphere.push(object);

  }

  // helix

  for (let i = 0, l = objects.length; i < l; i++) {

    const theta = i * 0.175 + Math.PI;
    const y = - (i * 8) + 450;

    const object = new THREE.Object3D();

    object.position.setFromCylindricalCoords(900, theta, y);

    vector.x = object.position.x * 2;
    vector.y = object.position.y;
    vector.z = object.position.z * 2;

    object.lookAt(vector);

    targets.helix.push(object);

  }

  // grid

  for (let i = 0; i < objects.length; i++) {

    const object = new THREE.Object3D();

    object.position.x = ((i % 5) * 400) - 800;
    object.position.y = (- (Math.floor(i / 5) % 5) * 400) + 800;
    object.position.z = (Math.floor(i / 25)) * 1000 - 2000;

    targets.grid.push(object);

  }

  //

  renderer = new CSS3DRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

  //

  controls = new TrackballControls(camera, renderer.domElement);
  controls.minDistance = 500;
  controls.maxDistance = 6000;
  controls.addEventListener('change', render);

  const buttonTable = document.getElementById('table');
  buttonTable.addEventListener('click', function () {

    transform(targets.table, 2000);
    display_tween(70, 500, 0, 2000)
    //objectdisplay.position.x = 70;
    //objectdisplay.position.y = 500;
    //objectdisplay.position.z = 0;

  });

  const buttonSphere = document.getElementById('sphere');
  buttonSphere.addEventListener('click', function () {

    transform(targets.sphere, 2000);
    display_tween(0, 0, 0, 2000);
    isTable = false;
    //transform(targets.objectdisplay_s, 2000);
    //objectdisplay.position.x = 0;
    //objectdisplay.position.y = 0;


  });

  const buttonHelix = document.getElementById('helix');
  buttonHelix.addEventListener('click', function () {

    transform(targets.helix, 2000);
    display_tween(70, 700, 0, 2000);
    isTable = false;
    //objectdisplay.position.x = 70;
    //objectdisplay.position.y = 700;
    //objectdisplay.position.z = 0;

  });

  const buttonGrid = document.getElementById('grid');
  buttonGrid.addEventListener('click', function () {

    transform(targets.grid, 2000);
    display_tween(0, 0, 500, 2000);
    isTable = false
    //objectdisplay.position.x = 0;
    //objectdisplay.position.y = 0;
    //objectdisplay.position.z = 500;

  });


  transform(targets.table, 2000);

  //

  window.addEventListener('resize', onWindowResize);

}

function transform(targets, duration) {

  TWEEN.removeAll();

  for (let i = 0; i < objects.length; i++) {

    const object = objects[i];
    const target = targets[i];

    new TWEEN.Tween(object.position)
      .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

    new TWEEN.Tween(object.rotation)
      .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
      .easing(TWEEN.Easing.Exponential.InOut)
      .start();

  }

  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start();

}

// tween display function

function display_tween(xpar, ypar, zpar, duration) {

  //TWEEN.removeAll();

  const object = objectdisplay;

  new TWEEN.Tween(object.position)
    .to({ x: xpar, y: ypar, z: zpar }, Math.random() * duration + duration)
    .easing(TWEEN.Easing.Exponential.InOut)
    .start();

  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start();

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();

}

function animate() {

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  TWEEN.update();

  controls.update();

}

function render() {

  renderer.render(scene, camera);

}

//require('./buttons.js')
/*const hbutton = document.getElementById( table[0] );
hbutton.addEventListener('click', function() {
  
  scene.remove(objectdisplay);
  display_value=table[0];
  display.textContent=display_value;
  scene.add(objectdisplay);

} );*/
let displayAtached = false

for (let i = 0; i < table.length; i += 5) {
  const hbutton = document.getElementById(table[i]);
  hbutton.addEventListener('click', function () {

    if (isTable === false) {
      transform(targets.table, 2000);
    }
    //scene.remove(objectdisplay);
    display_value = table[i + 1];
    display_atomic_number = table[i + 2];
    display_atomic_real_number = (i / 5) + 1;
    display.textContent = display_value;
    atomicRealNumber.textContent = "atomic number:" + display_atomic_real_number;
    atomicnumber.textContent = "atomic weight:" + display_atomic_number;
    display.appendChild(atomicRealNumber);
    display.appendChild(atomicnumber);
    const container = document.getElementById('container');
    if(displayAtached===false){
      camera.add(objectdisplay);
    }
    container.appendChild(display)
    displayAtached=true;
    
    display_tween(70, 500, 0, 2000)
    displayButton = document.getElementById('display');
    buttonOn();

  });
}



function buttonOn() {
  //displayButton = document.getElementById('display');
  displayButton.addEventListener('click', function () {
    
    camera.remove(objectdisplay);
    displayAtached=false;

  })
}
animate();
