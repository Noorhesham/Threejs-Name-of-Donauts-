import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
//creating the scene
const scene = new THREE.Scene();

//axes helper
const axisHelper = new THREE.AxesHelper(5);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("resize", (e) => {
  sizes.x = window.innerWidth;
  sizes.y = window.innerHeight;
});
window.addEventListener("mousemove", function (event) {
  //getting the client x andf y from the event object on the mousemove event and store them in the cursor object so that
  // i can use those values to update the camera position later on mouse move
  const eventClientX = event.clientX / sizes.width - 0.5;
  const eventClientY = event.clientY / sizes.height - 0.5;
  (cursor.x = eventClientX), (cursor.y = eventClientY);
});

//orbit controls

//creating a mesh requires to pass it a geometry (that takes width height and depth as parameters) and a material
//that takes color in an object and maybe wireframe as true to show the wireframe
const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
//creating a prospective canmera tha when obj is far its size will decrease unlike the orthographic camera
// so that i pass it the field of view aspect ratio and near and far values (when the obj is closer than near or far from far
// it will disappear)
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
//setting the camera positions before rendering it
// camera.position.x = 0;
// camera.position.y = 0;
camera.position.z = 2;

//getting the canvas from the html dom
const canvas = document.querySelector("canvas.webgl");

// CONTROLS
const orbit = new OrbitControls(camera, canvas);
orbit.enableDamping = true;

//BUFFER GEOMETRY
//making a geomerty from an array of positions

//making array of positions and filling them up with triangle values
const count = 50;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count; i++) {
  positionsArray[i] = Math.random() - 0.5;
}
// each triangle has 3 vertices and each vertices 3 positions value x y z on space
const positionAttributes = new THREE.BufferAttribute(positionsArray, 3);
//setting the attributes of the buffer geo with new buffer attribute =>pass the array and the value of how many vals for the vertex

//create the buffer geometry
const bufferGeometry = new THREE.BufferGeometry();
bufferGeometry.setAttribute("position", positionAttributes);
const mesh2 = new THREE.Mesh(bufferGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));

//adding the camera and axishelper box to the scene
scene.add(camera, axisHelper, mesh2);

//length fn is used to get the length of the vector from center of the screen , the distance is used to get distance
// between 2 vector 3 elements
// console.log(box.position.length(), box.position.distanceTo(camera.position));
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
//the renderer must take a canvas to render the scene on it and set the sizes of the full screen (or whatever u want )
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//get  estimate time from when the component or js code is mounted on the dom
const clock = new THREE.Clock();
function animate() {
  const elapsedTime = clock.getElapsedTime();

  //   box.rotation.y = elapsedTime;
  //When you move the mouse to the right, the value of cursor.x becomes positive (e.g., 0.5). If you apply cursor
  //.x directly to camera.position.x, the camera will move to the right.
  // This would make the scene appear to move to the left, creating an unnatural and inverted experience.
  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3; //adding minus cause three js coords make the x is right  so when i move mouse to right
  //   //it will move mesh to left
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  //   camera.position.y = cursor.y * 5;

  camera.lookAt(box.position); //provide a vector 3 (poisiton)
  //update the controls
  orbit.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
// the request animation frame will call the animate function every time the screen is refreshed
//it depeneds on the screen refresh rate or fps
animate();
