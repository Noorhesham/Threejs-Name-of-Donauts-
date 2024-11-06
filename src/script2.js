import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const cursor = {
  x: 0,
  y: 0,
};
// window.addEventListener("mousemove", (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = -(event.clientY / sizes.height - 0.5);
//   // y value is going up when the cursor is moving down
// });
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};
window.addEventListener("resize", () => {
  // Update sizes
  console.log("resizing ");
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  console.log(camera.aspect, sizes);
  camera.updateProjectionMatrix();
});
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true; // Enable smooth damping

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//controls
// console.log(controls);
//animation
//but this way has a problem that we need to adapt the frame rate cause it will different on each screen according to the fps of the screen
let time = Date.now();
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
const tick = () => {
  //fix the problem
  //   const CurrentTime = Date.now();
  //   const deltaTime = CurrentTime - time;
  //   time = CurrentTime;

  camera.position.x = Math.sin(cursor.x * 10) * 3;
  camera.position.z = Math.cos(cursor.z * 10) * 3;

  //   camera.position.y = cursor.y
  //   camera.lookAt(new THREE.Vector3());
  //   //update objects
  //   //   mesh.rotation.y += 0.001 * deltaTime; // the cube now is rotating in the same speed regardless of the frame rate of the screen
  //   //render
  //   controls.update();
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick); //pass it not call it js will call it by default on the next frame
  //   //depend on how many fps on the screen the fn will be called
};
tick();
