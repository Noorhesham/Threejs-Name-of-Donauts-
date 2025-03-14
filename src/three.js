import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// geometries
const sphere = new THREE.SphereGeometry(0.5, 64, 64);
const plane = new THREE.PlaneGeometry(1, 1, 100, 100);
const torus = new THREE.TorusGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});
//mesh=geometry+material

const mesh = new THREE.Mesh(sphere, material);
const mesh2 = new THREE.Mesh(plane, material);
const mesh3 = new THREE.Mesh(torus, material);
scene.add(mesh, mesh2, mesh3);
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
//this allows u to access controls and provide the camera and canvas to it
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // gives a sense of weight to the controls

/**
 * Renderer
 * so that we can render the scene on the canvas
 */
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

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
