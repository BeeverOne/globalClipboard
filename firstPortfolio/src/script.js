"use strict";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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

//Object
const box1Geometry = new THREE.BoxGeometry(1, 1, 1);
const box1Material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const box1Mesh = new THREE.Mesh(box1Geometry, box1Material);

const box2Geometry = new THREE.BoxGeometry(1, 1, 1);
const box2Material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const box2Mesh = new THREE.Mesh(box2Geometry, box2Material);

const box3Geometry = new THREE.BoxGeometry(1, 1, 1);
const box3Material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const box3Mesh = new THREE.Mesh(box3Geometry, box3Material);

//Axes Helper
const axesHelper = new THREE.AxesHelper(10);
const axesHelper02 = new THREE.AxesHelper(10);
const axesHelper03 = new THREE.AxesHelper(10);

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

scene.add(camera, axesHelper);
scene.add(box1Mesh);
scene02.add(camera02, axesHelper02);
scene02.add(box2Mesh);
scene03.add(camera03, axesHelper03, box3Mesh);

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: product01,
});
const renderer02 = new THREE.WebGLRenderer({
  canvas: product02,
});
const renderer03 = new THREE.WebGLRenderer({
  canvas: product03,
});
renderer.setSize(dimensions.width, dimensions.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer02.setSize(dimensions.width, dimensions.height);
renderer02.setPixelRatio(window.devicePixelRatio);
renderer03.setSize(dimensions.width, dimensions.height);

//Controls
const controller = new OrbitControls(camera, renderer.domElement);
controller.enableDamping = true;
const controller02 = new OrbitControls(camera02, renderer02.domElement);
controller02.enableDamping = true;
const controller03 = new OrbitControls(camera03, renderer03.domElement);
controller03.enableDamping = true;

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
}

animate();
