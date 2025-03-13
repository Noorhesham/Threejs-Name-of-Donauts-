import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
const width = window.innerWidth;
const height = window.innerHeight;
const aspect = width / height;
const frustumSize = 20; // Controls the visible area size

// Define the viewing volume
const camera = new THREE.OrthographicCamera(
  (-frustumSize * aspect) / 2, // left
  (frustumSize * aspect) / 2, // right
  frustumSize / 2, // top
  -frustumSize / 2, // bottom
  0.01, // near
  1000 // far
);

// Set the camera position and look direction
camera.position.set(0, 10, 10);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas.webgl"),
});
renderer.setSize(width, height);

// Add a cube for visualization
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
const controls = new OrbitControls(camera, document.querySelector("canvas.webgl"));
controls.enableDamping = true;
// Render the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
