"use strict";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RGBELoader } from "three/examples/jsm/Addons.js";

//Base Canvas
const product01 = document.querySelector("canvas.webgl1");
const product02 = document.querySelector("canvas.webgl2");
const product03 = document.querySelector("canvas.webgl3");

//Sizes
const dimensions = {
  width: 483,
  height: 546,
};
dimensions.aspect = dimensions.width / dimensions.height;

//Scene
const scene = new THREE.Scene();
const scene02 = new THREE.Scene();
const scene03 = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(
  75,
  dimensions.width / dimensions.height,
  0.1,
  100
);
camera.position.set(2, 2, 2);

const camera02 = new THREE.PerspectiveCamera(
  75,
  dimensions.width / dimensions.height,
  0.1,
  100
);
camera02.position.set(2, 2, 2);

const camera03 = new THREE.PerspectiveCamera(75, dimensions.aspect, 0.1, 100);
camera03.position.set(2, 2, 2);

//Lights
const ambientLight01 = new THREE.AmbientLight(0xffffff, 2.4);
scene.add(ambientLight01);
const ambientLight02 = new THREE.AmbientLight(0xffffff, 5);
scene02.add(ambientLight02);
const ambientLight03 = new THREE.AmbientLight(0xffffff, 5);
scene03.add(ambientLight03);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const directionalLight02 = new THREE.DirectionalLight(0xffffff, 3);
directionalLight02.castShadow = true;
directionalLight02.shadow.mapSize.set(1024, 1024);
directionalLight02.shadow.camera.far = 15;
directionalLight02.shadow.camera.left = -7;
directionalLight02.shadow.camera.top = 7;
directionalLight02.shadow.camera.right = 7;
directionalLight02.shadow.camera.bottom = -7;
directionalLight02.position.set(5, 5, 5);
scene02.add(directionalLight02);

const directionalLight03 = new THREE.DirectionalLight(0xffffff, 3);
directionalLight03.castShadow = true;
directionalLight03.shadow.mapSize.set(1024, 1024);
directionalLight03.shadow.camera.far = 15;
directionalLight03.shadow.camera.left = -7;
directionalLight03.shadow.camera.top = 7;
directionalLight03.shadow.camera.right = 7;
directionalLight03.shadow.camera.bottom = -7;
directionalLight03.position.set(5, 5, 5);
scene03.add(directionalLight03);

//Axes Helper
const axesHelper = new THREE.AxesHelper(10);
const axesHelper02 = new THREE.AxesHelper(10);
const axesHelper03 = new THREE.AxesHelper(10);

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: product01,
});
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.4;

const renderer02 = new THREE.WebGLRenderer({
  canvas: product02,
});
renderer02.outputEncoding = THREE.sRGBEncoding;
renderer02.toneMapping = THREE.ACESFilmicToneMapping;
renderer02.toneMappingExposure = 0.7;

const renderer03 = new THREE.WebGLRenderer({
  canvas: product03,
});
renderer03.outputEncoding = THREE.sRGBEncoding;
renderer03.toneMapping = THREE.ACESFilmicToneMapping;
renderer03.toneMappingExposure = 0.7;

//Renderer Updates
renderer.setSize(dimensions.width, dimensions.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer02.setSize(dimensions.width, dimensions.height);
renderer02.setPixelRatio(window.devicePixelRatio);
renderer03.setSize(dimensions.width, dimensions.height);

//HDR Loader and Loading
const hdrLoader = new RGBELoader();

hdrLoader.load("/HDRI/backy.hdr", function (hdr) {
  hdr.mapping = THREE.EquirectangularReflectionMapping;

  scene.environment = hdr;
});

hdrLoader.load("/HDRI/backy02.hdr", function (hdr) {
  hdr.mapping = THREE.EquirectangularReflectionMapping;

  scene02.environment = hdr;
});

hdrLoader.load("/HDRI/backy03.hdr", function (hdr) {
  hdr.mapping = THREE.EquirectangularReflectionMapping;

  scene03.environment = hdr;
});

//Controls
const controller = new OrbitControls(camera, renderer.domElement);
controller.enableDamping = true;
const controller02 = new OrbitControls(camera02, renderer02.domElement);
controller02.enableDamping = true;
const controller03 = new OrbitControls(camera03, renderer03.domElement);
controller03.enableDamping = true;

//Object
const box1Geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const box1Material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const box1Mesh = new THREE.Mesh(box1Geometry, box1Material);

const box2Geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const box2Material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const box2Mesh = new THREE.Mesh(box2Geometry, box2Material);

const box3Geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const box3Material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const box3Mesh = new THREE.Mesh(box3Geometry, box3Material);

//Scene Updates
scene.add(camera, axesHelper);
scene.add(box1Mesh);
scene02.add(camera02, axesHelper02);
scene02.add(box2Mesh);
scene03.add(camera03, axesHelper03, box3Mesh);

//Loader
const loadedBlends = {};
const blends = [
  {
    name: "duck",
    path: "/models/Duck/glTF/Duck.gltf",
    position: new THREE.Vector3(0, 0, 1),
    scale: new THREE.Vector3(1, 1, 1),
    scene: scene,
    camera: camera,
    controls: controller,
  },
  {
    name: "rover",
    path: "/models/Rover/babylonRover.glb",
    position: new THREE.Vector3(0, -0.5, 4),
    scale: new THREE.Vector3(1, 1, 1),
    scene: scene02,
    camera: camera02,
    controls: controller02,
  },
  {
    name: "porsche",
    path: "/models/Porsche/scene.gltf",
    position: new THREE.Vector3(0, 0, 2),
    scale: new THREE.Vector3(1, 1, 1),
    scene: scene03,
    camera: camera03,
    controls: controller03,
  },
];

const extLoader = new GLTFLoader();
console.log(extLoader);

blends.forEach((blend) => {
  extLoader.load(
    blend.path,
    function (gltf) {
      const activeBlend = gltf.scene;
      activeBlend.position.copy(blend.position);
      activeBlend.scale.copy(activeBlend.scale);
      blend.scene.add(activeBlend);

      blend.camera.position.set(
        activeBlend.position.x + 3,
        activeBlend.position.y + 3,
        activeBlend.position.z + 3
      );
      blend.controls.target.copy(activeBlend.position);
      blend.controls.update();

      //log
      console.log(`loaded ${blend.name}`);
    },
    function (xhr) {
      console.log(`${blend.name} ${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    function (error) {
      console.log(`An error occured while loading ${blend.name};`, error);
    }
  );
});

//Scene Manager
const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  //Update object

  //Controls Update
  controller.update();
  controller02.update();
  controller03.update();

  //Render
  renderer.render(scene, camera);
  renderer02.render(scene02, camera02);
  renderer03.render(scene03, camera03);

  //Call animate again next frame
  window.requestAnimationFrame(animate);

  console.log();
}

animate();
