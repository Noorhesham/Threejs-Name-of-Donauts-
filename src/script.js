import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
//guis
const gui = new GUI();
const guiHolder = {};
guiHolder.color = "#a78484";
// event listeners
window.addEventListener("resize", () => {
  // Update sizes
  console.log("resizing ");
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  console.log(camera.aspect, sizes);
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
// window.addEventListener("mousemove", (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = -(event.clientY / sizes.height - 0.5);
//   // y value is going up when the cursor is moving down
// });

//loading manager
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log();
};
loadingManager.onProgress = () => {
  console.log("onprogress");
};
loadingManager.onLoad = () => {
  console.log("onload");
};

loadingManager.onError = () => {
  console.log("onerror");
};
// Textures
//behind the scences
// const image = new Image();
// const texture = new THREE.Texture(image);
// texture.colorSpace = THREE.SRGBColorSpace
// image.onload = () => {
//   texture.needsUpdate = true;
// };
// image.src = "/textures/door/color.jpg";
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load(
  "/textures/door/color.jpg",
  () => {}, //success
  () => {}, //progress
  () => {} //error
);
colorTexture.colorSpace = THREE.SRGBColorSpace;
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const ambientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg");
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
// colorTexture.repeat.x=2
// colorTexture.repeat.y=3
// colorTexture.wrapS=THREE.MirroredRepeatWrapping
// colorTexture.wrapT=THREE.RepeatWrapping
// colorTexture.offset.x=0.5
// colorTexture.offset.y=0.5
colorTexture.rotation=Math.PI*0.25
// cursor
const cursor = {
  x: 0,
  y: 0,
};
// Sizes
const sizes = {
  width: window.innerWidth,
  height: 600,
};

// // Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// buffer geomerty
//making a geomerty from an array of positions
const count = 510;
const bufferGeometry = new THREE.BufferGeometry();
const positionsArray = new Float32Array(count * 3 * 3);
// each triangle has 3 vertices and each vertices 3 positions value x y z on space
for (let i = 0; i < count * 3 * 3; i++) {
  // filling the array with position values
  positionsArray[i] = Math.random() - 0.5;
}
//setting the attributes of the buffer geo with new buffer attribute =>pass the array and the value of how many vals for the position
bufferGeometry.setAttribute("position", new THREE.BufferAttribute(positionsArray, 3));

// Geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
gui.add(mesh.position, "y").min(-3).max(3).step(0.01);
scene.add(mesh);
gui.addColor(material, "color").onChange((value) => material.color.set(value.getHexString()));
gui.add(material, "wireframe");
guiHolder.subDivision = 2;
gui
  .add(guiHolder, "subDivision")
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose(); // get rid of old geometry
    mesh.geometry = new THREE.BoxGeometry(1, 1, 1, guiHolder.subDivision, guiHolder.subDivision, guiHolder.subDivision);
  });
guiHolder.spin = () => {
  gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 });
};
gui.add(guiHolder, "spin");
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // Enable smooth damping
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

  //   camera.position.x = Math.sin(cursor.x * 10) * 3;
  //   camera.position.z = Math.cos(cursor.x * 10) * 3;

  //   camera.position.y = cursor.y
  //   camera.lookAt(new THREE.Vector3());
  //   //update objects
  //   //   mesh.rotation.y += 0.001 * deltaTime; // the cube now is rotating in the same speed regardless of the frame rate of the screen
  //   //render
  //   controls.update();
  //   camera.lookAt(mesh.position);
  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick); //pass it not call it js will call it by default on the next frame
  //   //depend on how many fps on the screen the fn will be called
};
tick();
