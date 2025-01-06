"use strict";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";
import { depth } from "three/examples/jsm/nodes/Nodes.js";

// #region GUI-Debugger
const gui = new GUI({
  width: 300,
  title: "Threefresher Debugger",
});
/*Debugger Keyboard Toggle*/
window.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    gui.show(gui._hidden);
  }
});
/*Debug-Object*/
const debugObject = {
  color: "#3A6EA6",
  widthSegments: 2,
  heightSegments: 2,
  depthSegments: 2,
  jumpHeight: 1,
};
/*Folders*/
const appearanceFolder = gui.addFolder("Appearance");
const transformFolder = gui.addFolder("Transforms");
const actionsFolder = gui.addFolder("Actions");
// #endregion

//Canvas
const canvas = document.querySelector("canvas.webgl");

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

//Axes helper
const axesHelper = new THREE.AxesHelper(10);
/*Append Axes Helper to Scene*/
scene.add(axesHelper);

// #region Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
/*Camera Position*/
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
/*Append Camera to Scene*/
scene.add(camera);
// #endregion

// #region OBJECT: Cube
let cubeGeometry = new THREE.BoxGeometry(
  1,
  1,
  1,
  debugObject.widthSegments,
  debugObject.heightSegments,
  debugObject.depthSegments
);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: debugObject.color });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
/*Append Cube to Scene*/
scene.add(cubeMesh);
// #endregion

// #region Function to update Cube Geometry
const updateGeometry = () => {
  return new THREE.BoxGeometry(
    1,
    1,
    1,
    debugObject.widthSegments,
    debugObject.heightSegments,
    debugObject.depthSegments
  );
};
// #endregion

// #region ACTIONS
/*Spin*/
debugObject.spin = () => {
  gsap.to(cubeMesh.rotation, {
    y: cubeMesh.rotation.y + Math.PI * 2,
    ease: "elastic.out(1, 0.3)",
  });
};

/*Jump*/
debugObject.jump = () => {
  const originalY = 0; //Store original Y-Position

  const jumpTimeline = gsap.timeline(); //Create Timeline for more precise control
  jumpTimeline
    //Anticipation
    .to(cubeMesh.position, { y: -0.2, duration: 0.2, ease: "power2.inOut" })
    //Quick, powerful launch upwards
    .to(cubeMesh.position, {
      y: debugObject.jumpHeight,
      duration: 0.5,
      ease: "power4.out",
    })
    //Hold in the air
    .to(cubeMesh.position, {
      y: debugObject.jumpHeight,
      duration: 0.1,
      ease: "none",
    })
    //Fall down with slight overshoot
    .to(cubeMesh.position, { y: originalY, duration: 0.5, ease: "bounce.out" });
};

/*Reset*/
debugObject.reset = () => {
  cubeMesh.position.set(0, 0, 0);
  cubeMesh.rotation.set(0, 0, 0);
};
// #endregion

// #region GUI-Elements
// #region Appearance
/*Color-Picker*/
appearanceFolder
  .addColor(debugObject, "color")
  .onChange(() => {
    cubeMaterial.color.set(debugObject.color);
  })
  .name("Color");
/*Wireframe-Checkbox*/
appearanceFolder
  .add(cubeMaterial, "wireframe")
  .name("Wireframe")
  .setValue(false);
/*WidthSegments*/
appearanceFolder
  .add(debugObject, "widthSegments")
  .min(1)
  .max(10)
  .step(1)
  .name("Width Segments")
  .onChange(() => {
    cubeGeometry.dispose();
    cubeGeometry = updateGeometry();
    cubeMesh.geometry = cubeGeometry;
  });
/*HeightSegments*/
appearanceFolder
  .add(debugObject, "heightSegments")
  .min(1)
  .max(10)
  .step(1)
  .name("Height Segments")
  .onChange(() => {
    cubeGeometry.dispose();
    cubeGeometry = updateGeometry();
    cubeMesh.geometry = cubeGeometry;
  });
/*DepthSegments*/
appearanceFolder
  .add(debugObject, "depthSegments")
  .min(1)
  .max(10)
  .step(1)
  .name("Depth Segments")
  .onChange(() => {
    cubeGeometry.dispose();
    cubeGeometry = updateGeometry();
    cubeMesh.geometry = cubeGeometry;
  });
// #endregion

// #region Transforms
/*Y-Axis Position (Up/Down)*/
transformFolder
  .add(cubeMesh.position, "y")
  .min(-2)
  .max(2)
  .step(0.01)
  .name("Elevation");
/*Y-Axis Rotation (Left/Right)*/
transformFolder
  .add(cubeMesh.rotation, "y")
  .min(-Math.PI)
  .max(Math.PI)
  .name("Rotation");
// #endregion

// #region Actions
/*Jump-Height*/
actionsFolder
  .add(debugObject, "jumpHeight")
  .min(1)
  .max(3)
  .step(0.1)
  .onChange((value) => {
    debugObject.jumpHeight = value;
  })
  .name("Jump Height");
/*Spin-Button*/
actionsFolder.add(debugObject, "spin").name("Spin");
/*Jump-Button*/
actionsFolder.add(debugObject, "jump").name("Jump");
/*Reset-Button*/
actionsFolder.add(debugObject, "reset").name("Reset");
// #endregion
// #endregion

// #region Resize-EventListener
window.addEventListener("resize", () => {
  /*Update Sizes*/
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  /*Update Camera*/
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  /*Update Renderer*/
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
// #endregion

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// #region Animate
const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  /*Update Controls*/
  controls.update();

  /*Render*/
  renderer.render(scene, camera);

  /*Call tick again on the next frame*/
  window.requestAnimationFrame(animate);
}

animate();

// #endregion
