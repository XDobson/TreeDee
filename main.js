import './style.css'

import * as THREE from 'https://unpkg.com/three@0.124.0/build/three.module.js';

// Importing controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
})

// setting render size and the camera position
renderer.setPixelRatio (window.devicePixelRatio) ; 
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30);
renderer.render(scene, camera)

// Adding geometry
const geometry = new THREE.TorusGeometry (10,3,16,100)
const material = new THREE.MeshPhysicalMaterial({color: 0x999fff, wireframe: false, clearcoat : true, opacity: 0.2}) ;
const torus = new THREE.Mesh(geometry,material)
scene.add(torus)

// Animation loop
function animate() {
  requestAnimationFrame( animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.02;
  torus.rotation.z += 0.01;

  controls.update()
  renderer.render(scene,camera)
}

// Lights
const pointLight = new THREE.PointLight(0xFFFFFF)
const lightHelper = new THREE.PointLightHelper(pointLight)
pointLight.position.set(20,10,0)
const ambient = new THREE.AmbientLight(0x34567)
scene.add(pointLight, lightHelper)
scene.add(ambient)

// Adds grid
const gridHelper = new THREE.GridHelper(200,50)
scene.add(gridHelper)

// Add controls
const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color:0xFFFFFF})
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

// call it
animate()