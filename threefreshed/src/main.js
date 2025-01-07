"use strict";

import * as THREE from "three";
import { initScene } from "./scene.js";
import { initCamera } from "./camera.js";
import { initRenderer } from "./renderer.js";
import { initControls } from "./controls.js";
import { initGUI } from "./gui.js";
import { createCubeMesh } from "./geometry.js";
import { createLights } from "./lights.js";

//Scene and Camera Initialization
const scene = initScene();
const camera = initCamera();

//Renderer and Canvas Initialization
const canvas = document.getElementById("webgl");
const renderer = initRenderer(canvas);

//Lights
const lights = createLights();
scene.add(lights.ambient);
scene.add(lights.directional);
scene.add(lights.point);

//Cube Creation
const cubeMesh = createCubeMesh();
scene.add(cubeMesh);

//Add Axes Helper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

//Controls Initialization
const controls = initControls(camera, canvas);

//GUI Initialization
initGUI(cubeMesh, scene);

//Resize Listener
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

//Animation Loop
const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  //Update controls
  controls.update();

  //Render
  renderer.render(scene, camera);

  //Call animate recursively
  window.requestAnimationFrame(animate);
}

animate();
