
import * as THREE from 'three';
import { TWEEN } from '../node_modules/three/examples/jsm/libs/tween.module.min.js';
import { TrackballControls } from '../node_modules/three/examples/jsm/controls/TrackballControls.js';
//import {OrbitControls} from '../node_modules/three/examples/jsm/controls/OrbitControls'
import { CSS3DRenderer, CSS3DObject } from '../node_modules/three/examples/jsm/renderers/CSS3DRenderer.js';
import { table } from './data.js';
import {display, atomicRealNumber, atomicnumber, objectdisplay} from './display.js';
import {searcher, objectsearcher, searchinput} from './searcher.js'
import {szuk} from './searchengine.js'



let camera, scene, renderer, controls, displayButton, searcherButton;
let isTable = true;
let isGrid = false;
export let display_value = "Value";
let display_atomic_number = ' ';
let display_atomic_real_number = '';
const objects = [];
const targets = { table: [], sphere: [], helix: [], grid: [] };

init();
animate();

function init() {
  
  //camera

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 3000;

  scene = new THREE.Scene();
  scene.add(camera);

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

  // renderer

  renderer = new CSS3DRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

  // controls

  //controls = new OrbitControls(camera, renderer.domElement);
  controls = new TrackballControls(camera, renderer.domElement);
  controls.minDistance = 500;
  controls.maxDistance = 6000;
  controls.addEventListener('change', render);
  //controls.maxPolarAngle=1.57;
  //controls.minPolarAngle=1.57;
  //controls.rotateSpeed = 0.1;

  const buttonTable = document.getElementById('table');
  buttonTable.addEventListener('click', function () {

    transform(targets.table, 2000);
   
  });

  const buttonSphere = document.getElementById('sphere');
  buttonSphere.addEventListener('click', function () {

    transform(targets.sphere, 2000);
    isTable = false;

  });

  const buttonHelix = document.getElementById('helix');
  buttonHelix.addEventListener('click', function () {

    transform(targets.helix, 2000);
    isTable = false;

  });

  const buttonGrid = document.getElementById('grid');
  buttonGrid.addEventListener('click', function () {

    transform(targets.grid, 2000);
    isTable = false;
    isGrid = true;
 
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

let displayAtached = false

for (let i = 0; i < table.length; i += 5) {
  const hbutton = document.getElementById(table[i]);
  hbutton.addEventListener('click', function () {

    if (isTable === false) {
     // transform(targets.table, 2000);
    }
    
    if(isGrid ===true){
      transform(targets.table, 2000);
    }


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
      //scene.add(camera);
      camera.add(objectdisplay);
      
      objectdisplay.position.set(0,0,-1500);
    }
    container.appendChild(display)
    displayAtached=true;
    display_tween(-500,170,-1000, 2000)
    //display_tween(70, 500, 0, 2000)
    displayButton = document.getElementById('display');
    buttonOn();
    
    //searcher test placeholder
    
  });
}



function buttonOn() {
 
  displayButton.addEventListener('click', function () {
    
    camera.remove(objectdisplay);
    displayAtached=false;

  })
}

const searchBar = document.getElementById('searchbar');
searchBar.addEventListener('click', function(){
  camera.add(objectsearcher);
  objectsearcher.position.set(0,260,-1500);
  const container = document.getElementById('container');
  container.appendChild(searcher);
  searcherButton=document.getElementById('searcher');
  buttonSearchOff();
})

function buttonSearchOff(){
searcherButton.addEventListener('dblclick', function(){
    camera.remove(objectsearcher);


})
searchinput.addEventListener('input', function(){
  const lettersToCheck = searchinput.value
    szuk(lettersToCheck)
})
}

//animate();
