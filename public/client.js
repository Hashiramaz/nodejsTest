// client-side js
// run by the browser each time your view template is loaded

// Extract globals, otherwise linting gets angry

//import {
//  OrbitControls
//} from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

const { THREE } = window;
//import OrbitControls from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

// Create a scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50, window.innerWidth / window.innerHeight, 0.1, 1000
);

//camera.position.set(0, 0, 30);

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xdfdfdf);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//let controls = new THREE.OrbitControls(camera, renderer.domElement);
scene.add(new THREE.GridHelper(10, 10));
// Add a cube to the scene
//const geometry = new THREE.BoxGeometry(2, 2, 2);
const geometry = new THREE.CylinderGeometry( 2, 2, 2, 6 );
const material = new THREE.MeshStandardMaterial({ color: 0x00df00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position our camera so we can see the cube
//camera.position.z = 10;
//camera.rotation.x = 0;
camera.rotation.set(-1.57,0,0);
camera.position.set(0, 15, 0);


let pts = [];
pts.push(new THREE.Vector3());

let unit = Math.sqrt(3);

let angle = Math.PI / 3;
let axis = new THREE.Vector3(0, 0, 0);

let axisVector = new THREE.Vector3(0, -unit, 0);
let sideVector = new THREE.Vector3(0, unit, 0).applyAxisAngle(axis, -angle);
let circleCount = 10;
let tempV3 = new THREE.Vector3();
for (let seg = 0; seg < 6; seg++) {
  for (let ax = 1; ax <= circleCount; ax++) {
    for (let sd = 0; sd < ax; sd++) {
      tempV3.copy(axisVector)
      	.multiplyScalar(ax)
        .addScaledVector(sideVector, sd)
        .applyAxisAngle(axis, angle * seg);
        
      pts.push(new THREE.Vector3().copy(tempV3));
    }
  }
}
console.log(pts.length);

//let g = new THREE.BufferGeometry().setFromPoints(pts);
let m = new THREE.PointsMaterial({
  size: 0.25,
  color: "yellow"
});
//let o = new THREE.Points(g, m);
//scene.add(o);







// Add a directional light to the scene
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
scene.add(directionalLight);

// Add an ambient light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);





// Start the render loop 
function render() {
  requestAnimationFrame(render);
  
  // Rotate our cube
  cube.rotation.x += 0.0;
  cube.rotation.y += 0.01;
  
  renderer.render(scene, camera);
}
render();

