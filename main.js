import './style.css'

// ALTERNATE IMPORT
import * as THREE from 'https://unpkg.com/three@0.139.2/build/three.module.js';
// import * as THREE from 'three';

// Importing controls
import { OrbitControls } from 'https://unpkg.com/three@0.124.0/examples/jsm/controls/OrbitControls.js'



// VariableVille, where my variables live so they're properly defined before the code executes
let controlOn = false;
let keys = [];

// Start the scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// Renders to the canvas element with the ID of background
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
})

// setting render size and the camera position
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(-20);
camera.position.setX(-20);
camera.position.setY(30);
renderer.render(scene, camera)

// Adding geometry
const geometry = new THREE.TorusGeometry(5, 2, 16, 100)
const geometry2 = new THREE.TorusGeometry(10, 2, 16, 100)
const geometry3 = new THREE.TorusGeometry(15, 2, 16, 100)
const material = new THREE.MeshPhysicalMaterial({ color: 0xff0000, wireframe: false, clearcoat: true, opacity: 0.2 });

const torus = new THREE.Mesh(geometry, material)
const torus2 = new THREE.Mesh(geometry2, material)
const torus3 = new THREE.Mesh(geometry3, material)
scene.add(torus)
scene.add(torus2)
scene.add(torus3)


// Lights
const pointLight = new THREE.PointLight(0xFFFFFF)
const lightHelper = new THREE.PointLightHelper(pointLight)
pointLight.position.set(20, 10, 0)
const ambient = new THREE.AmbientLight(0x666666)
scene.add(pointLight, lightHelper)
scene.add(ambient)

// Adds grid
const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(gridHelper)

// Governs controls
const controls = new OrbitControls(camera, renderer.domElement)

// Scrolling
function moveCamera() { 

  let t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.1;
  // camera.position.y = t * -0.02;
  // camera.position.x = t * -0.1;

  camera.lookAt(0,0,0)
}

// Skybox
const sky = new THREE.TextureLoader().load("44211.jpeg")
scene.background = sky

// Adds stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xFFFFFF })
  const star = new THREE.Mesh(geometry, material);
  
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));
  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.02;
  torus.rotation.z += 0.01;

  torus2.rotation.x += -0.005;
  torus2.rotation.y += -0.01;
  torus2.rotation.z += -0.005;

  torus3.rotation.x += 0.005;
  torus3.rotation.y += 0.01;
  torus3.rotation.z += 0.005;
  
  
  renderer.render(scene, camera)
}

// call it
moveCamera()
document.body.onscroll = moveCamera
animate()