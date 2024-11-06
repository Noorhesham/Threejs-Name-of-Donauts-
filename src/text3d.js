import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

///
/**
 * Base
 */
// Debug
const gui = new GUI();
const axisHelper = new THREE.AxesHelper();
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
scene.add(axisHelper);
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matCapTexture = textureLoader.load("./textures/matcaps/1.png");
matCapTexture.colorSpace = THREE.SRGBColorSpace;
//texture loader for revision purpose
// const textureLoader = new THREE.TextureLoader(loadingManager);
// const colorTexture = textureLoader.load(
//   "/textures/door/color.jpg",
//   () => {}, //success
//   () => {}, //progress
//   () => {} //error
// );
//fonts
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json ", (font) => {
  //create geomerty of text
  //first param is the text string
  const textGemometry = new TextGeometry("My Name Is Noor Hesham", {
    font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  textGemometry.center();
  textGemometry.computeBoundingBox(); // to get the bounding
  //   textGemometry.translate(
  //     -(textGemometry.boundingBox.max.x - 0.02) * 0.5,
  //     -(textGemometry.boundingBox.max.y - 0.02) * 0.5,
  //     -textGemometry.boundingBox.max.z * 0.5
  //   );
  console.log(textGemometry.boundingBox);
  const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matCapTexture });
  const text = new THREE.Mesh(textGemometry, textMaterial);
  //   text.position.x=-4
  scene.add(text);
  console.time("donauts");
  const donautGeoMetry = new THREE.TorusGeometry(0.3, 0.2, 20, 46);
  const donautMaterial = new THREE.MeshMatcapMaterial({ matcap: matCapTexture });
  for (let index = 0; index < 100; index++) {
    const donautMesh = new THREE.Mesh(donautGeoMetry, donautMaterial);
    // gsap.fromTo(
    //   donautMesh.position,
    //   { x: Math.random() * 6, y: Math.random() * 6, z: Math.random() * 6 },
    //   { duration: 2, x: Math.random() * 6, y: Math.random() * 6, z: Math.random() * 6, ease: "power1.inOut" }
    // );
    const scale = Math.random();
    gsap.fromTo(
      donautMesh.position,
      { x: Math.random() * 6, y: Math.random() * 6, z: Math.random() * 6 },
      {
        duration: 2,
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 10,
        onUpdate: () => {
          donautMesh.rotation.x = Math.random() * Math.PI;
        },
        ease: "power1.inOut",
      }
    );
    donautMesh.scale.set(scale, scale, scale);
    // donautMesh.position.x = (Math.random() - 0.5) * 10;
    // donautMesh.position.y = (Math.random() - 0.5) * 10;
    // donautMesh.position.z = (Math.random() - 0.5) * 10;
    // donautMesh.rotation.x = Math.random() * Math.PI;
    scene.add(donautMesh);
  }
  console.timeEnd("donauts");
});
/**
 * Object
 */
const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial());

// scene.add(cube);

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
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
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
