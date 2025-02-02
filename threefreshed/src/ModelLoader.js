"use strict";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";

export const MODELS = {
  NONE: null, //Default Cube
  BERET: "/src/models/Beret.glb",
  DONUT: "/src/models/donut.glb",
  DANCER: "/static/animations/dancing.glb",
};

export const MODEL_TYPES = {
  CUBE: "Cube",
  BERET: "Beret",
  DONUT: "Donut",
  DANCER: "Dancer",
};

export class ModelLoader {
  constructor() {
    this.gltfLoader = new GLTFLoader();
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath("/draco/");
    this.gltfLoader.setDRACOLoader(this.dracoLoader);
    this.isLoading = false;
  }

  async loadModel(path) {
    this.isLoading = true;
    return new Promise((resolve, reject) => {
      //Handle both URLs and File paths
      const isURL =
        path.startsWith("data:") ||
        path.startsWith("blob:") ||
        path.startsWith("https:");
      const modelPath = isURL ? path : window.location.origin + path;

      this.gltfLoader.load(
        modelPath,
        (gltf) => {
          this.isLoading = false;
          resolve(gltf);
        },
        (progress) => {
          console.log(`Loading: ${(progress.loaded / progress.total) * 100}%`);
        },
        (error) => {
          this.isLoading = false;
          reject(error);
        }
      );
    });
  }

  getLoadingState() {
    return this.isLoading;
  }
}
