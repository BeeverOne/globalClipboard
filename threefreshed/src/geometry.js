"use strict";

import * as THREE from "three";
import { ModelLoader } from "./ModelLoader.js";
import { MODELS, MODEL_TYPES } from "./ModelLoader.js";

//ModelLoader Initialization
const modelLoader = new ModelLoader();

// ! Debugger
export const debugObject = {
  color: "#3A6EA6",
  widthSegments: 2,
  heightSegments: 2,
  depthSegments: 2,
  jumpHeight: 1,
  modelScale: 1,
};

// ! Geometry Creator
function createCubeGeometry() {
  return new THREE.BoxGeometry(
    1,
    1,
    1,
    debugObject.widthSegments,
    debugObject.heightSegments,
    debugObject.depthSegments
  );
}

// ! Mesh Creation
export async function createMesh(modelPath = MODELS.BERET) {
  try {
    if (modelPath) {
      const gltf = await modelLoader.loadModel(modelPath);
      const model = gltf.scene;
      model.position.set(0, 0, 0);

      // Apply materials to loaded model
      model.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: debugObject.color,
            metalness: 0.1,
            roughness: 0.8,
          });
        }
      });

      return model;
    }
    return createCubeMesh();
  } catch (error) {
    console.error("Model loading failed:", error);
    return createCubeMesh();
  }
}

// #region switchModel

export async function switchModel(type) {
  switch (type) {
    case MODEL_TYPES.CUBE:
      return createCubeMesh();
    case MODEL_TYPES.BERET:
      return await createMesh(MODELS.BERET);
    case MODEL_TYPES.DONUT:
      return await createMesh(MODELS.DONUT);
    default:
      return createCubeMesh();
  }
}
// #endregion

// #region createCubeMesh

export function createCubeMesh() {
  const cubeGeometry = createCubeGeometry();
  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: debugObject.color,
  });
  const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
  return cubeMesh;
}
// #endregion

// ! Cube Geometry Updater
export function updateCubeGeometry(cubeMesh) {
  cubeMesh.geometry.dispose();
  cubeMesh.geometry = createCubeGeometry();
}
