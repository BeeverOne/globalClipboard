"use strict";

import * as THREE from "three";
import { initScene } from "./scene.js";
import { initCamera } from "./camera.js";
import { initRenderer } from "./renderer.js";
import { initControls } from "./controls.js";
import { initGUI } from "./gui.js";
import {
  createCubeMesh,
  createMesh,
  switchModel,
  createFloorPlane,
} from "./geometry.js";
import { createLights } from "./lights.js";
import { MODEL_TYPES } from "./ModelLoader.js";
import { initDragAndDrop } from "./utilities.js";

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

//Floor Plane
const floorPlane = createFloorPlane();
scene.add(floorPlane);

//Drag and Drop Initialization
initDragAndDrop(scene);

// Add drag feedback
window.addEventListener("dragenter", () => {
  document.documentElement.classList.add("dragover");
});

window.addEventListener("dragleave", (event) => {
  if (!event.relatedTarget) {
    document.documentElement.classList.remove("dragover");
  }
});

window.addEventListener("drop", () => {
  document.documentElement.classList.remove("dragover");
});

//Initial Model
const initialModel = await switchModel(MODEL_TYPES.CUBE);
initialModel.name = "currentModel";
scene.add(initialModel);

//Cube Creation
// const cubeMesh = createCubeMesh();
// scene.add(cubeMesh);

//Add Axes Helper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

//Controls Initialization
const controls = initControls(camera, canvas);

//GUI Initialization
initGUI(initialModel, scene);

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
