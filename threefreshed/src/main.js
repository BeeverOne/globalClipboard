"use strict";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
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

// Configure DRACOLoader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/examples/jsm/libs/draco/"); // Set the path to the Draco decoder
dracoLoader.preload();

// Load and animate GLB model
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load(
  "../static/animations/dancing.glb",
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    // Extract the animation clips
    const clips = gltf.animations;

    // Create an AnimationMixer
    const mixer = new THREE.AnimationMixer(model);

    // Play the first animation clip
    const action = mixer.clipAction(clips[0]);
    action.play();

    // Update the mixer on each frame
    function animate() {
      const delta = clock.getDelta();
      mixer.update(delta);

      //Update controls
      controls.update();

      //Render
      renderer.render(scene, camera);

      //Call animate recursively
      window.requestAnimationFrame(animate);
    }

    animate();
  },
  undefined,
  (error) => {
    console.error("An error happened", error);
  }
);

//Initial Model
const initialModel = await switchModel(MODEL_TYPES.CUBE);
initialModel.name = "currentModel";
scene.add(initialModel);

//Cube Creation
// const cubeMesh = createCubeMesh();
// scene.add(cubeMesh);

//Add Grid Helper
const gridHelper = new THREE.GridHelper(50, 50);
// scene.add(gridHelper);

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
