import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
// debug
const gui = new GUI();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;
camera.position.x = 1;
camera.position.y = 1;
//loading manager
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {};
loadingManager.onLoad = () => {};
loadingManager.onProgress = () => {};
loadingManager.onError = () => {};

//texture
//i pass the loading manager  to the texture loader and then everytime i load a texture from the instance of the thexture loader
//it will apply the loading manager callbacks on it
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load(
  "/textures/door/color.jpg",
  () => {}, // load
  () => {}, // progress
  () => {} //errors
);
colorTexture.colorSpace = THREE.SRGBColorSpace;
// const grayTexture = textureLoader.load("/textures/door/gray.jpg");
// const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
// const heightTexture = textureLoader.load("/textures/door/height.jpg");
// const ambientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg");
// const metalness = textureLoader.load("/textures/door/metalness.jpg");
// const roughness = textureLoader.load("/textures/door/roughness.jpg");
// const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("./textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("./textures/door/roughness.jpg");
const ambientOcclusionTexture = textureLoader.load("./textures/door/ambientOcclusion.jpg");
const matCapTexture = textureLoader.load("./textures/matcaps/3.png");
const gradientTexture = textureLoader.load("./textures/gradients/3.jpg");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matCapTexture.colorSpace = THREE.SRGBColorSpace;

// const material = new THREE.MeshBasicMaterial({ map: doorColorTexture });
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.Color(0xff00ff);
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.2;
// material.alphaMap = doorAlphaTexture; //white =>visible black=>invisible
// material.side = THREE.DoubleSide; //need more processing power
// const material = new THREE.MeshNormalMaterial();
// const material = new THREE.MeshMatcapMaterial({
//   matcap: matCapTexture,
// });

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0xff00ff);

// const material = new THREE.MeshToonMaterial();
// this would be using the mag filter cause  the texture is being stretched on the render elemnt
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

// const material = new THREE.MeshStandardMaterial();
// material.metalness = 1;
// material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = ambientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture; // addd details
// material.normalScale.set(0.5, 0.5);
// material.transparent=true
// material.alphaMap = doorAlphaTexture;
// gui.add(material, "metalness").min(0).max(1).step(0.001);
// gui.add(material, "roughness").min(0).max(1).step(0.001);

const material = new THREE.MeshPhysicalMaterial();
material.metalness = 1;
material.roughness = 1;
material.map = doorColorTexture;
material.aoMap = ambientOcclusionTexture;
material.aoMapIntensity = 1;
material.displacementMap = doorHeightTexture;
material.displacementScale = 0.1;
material.metalnessMap = doorMetalnessTexture;
material.roughnessMap = doorRoughnessTexture;
material.normalMap = doorNormalTexture; // addd details
material.normalScale.set(0.5, 0.5);
//make it transpatent
material.transparent = true;
material.alphaMap = doorAlphaTexture;
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);

//clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0.5;
// gui.add(material, "clearcoat").min(0).max(1).step(0.001);
// gui.add(material, "clearcoatRoughness").min(0).max(1).step(0.001);

//sheen
// material.sheen = 1;
// material.sheenRoughness = 0.5;
// material.sheenColor.set(0xff00ff);
// gui.add(material, "sheen").min(0).max(1).step(0.001);
// gui.add(material, "sheenRoughness").min(0).max(1).step(0.001);
// gui.addColor(material, "sheenColor");

//iridescence  الضوء الملون القوس قزح الي علي الاسطوانات القديمة
// material.iridescence = 1;
// material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];

// gui.add(material, "iridescence").min(0).max(1).step(0.001);
// gui.add(material, "iridescenceIOR").min(1).max(2.333).step(0.001);
// gui.add(material.iridescenceThicknessRange, "0").min(1).max(1000).step(1);
// gui.add(material.iridescenceThicknessRange, "1").min(1).max(1000).step(1);

//transmission
material.transmission = 1;
material.ior = 1.5;
material.thickness = 0.5;
gui.add(material, "transmission").min(0).max(1).step(0.001);
gui.add(material, "ior").min(1).max(10).step(0.001);
gui.add(material, "thickness").min(0).max(1).step(0.001);

// lights
const light = new THREE.AmbientLight(0xffffff, 1);
const pointLight = new THREE.PointLight(0xffffff, 30);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
/**
 ENVIRONMENT MAP
 */
const rgbeLoader = new RGBELoader();
rgbeLoader.load("/textures/environmentMap/2k.hdr", (environmentmap) => {
  environmentmap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentmap;
  scene.environment = environmentmap;
});
//

const torus = new THREE.TorusGeometry(1, 0.4, 16, 60);
const plane = new THREE.PlaneGeometry(1, 1, 32, 32);
const sphere = new THREE.SphereGeometry(0.5, 64, 64);
const canvas = document.querySelector("canvas.webgl");
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const [meshTorus, meshPlane, meshSphere] = [
  new THREE.Mesh(torus, material),
  new THREE.Mesh(plane, material),
  new THREE.Mesh(sphere, material),
];
meshTorus.position.x = -2;
meshPlane.position.x = 1.3;
scene.add(meshTorus, meshPlane, meshSphere, camera, light, pointLight);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// const axesHelper = new THREE.AxesHelper(5);
const clock = new THREE.Clock();
function animate() {
  const elapsedTime = clock.getElapsedTime();

  meshSphere.rotation.y = 0.01 * elapsedTime;
  meshTorus.rotation.y = 0.01 * elapsedTime;
  meshPlane.rotation.y = 0.01 * elapsedTime;
  meshSphere.rotation.x = -0.15 * elapsedTime;
  meshTorus.rotation.x = -0.15 * elapsedTime;
  meshPlane.rotation.x = -0.15 * elapsedTime;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
