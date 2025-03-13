import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight, directionalLightHelper);
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material);
torus.position.x = 1.5;
scene.add(sphere, cube, torus);
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
const clock = new THREE.Clock();
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
/*
Adjusts the rendering resolution based on the device's pixel density (window.devicePixelRatio).
Math.min(window.devicePixelRatio, 2) ensures it does not exceed 2, preventing performance issues on high-resolution displays.
A higher pixel ratio improves sharpness, but using values above 2 can significantly impact performance.
 */
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
