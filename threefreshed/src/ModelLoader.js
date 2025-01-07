"use strict";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";

export const MODELS = {
  NONE: null, //Default Cube
  BERET: "/src/models/Beret.glb",
  DONUT: "/src/models/donut.glb",
};

export const MODEL_TYPES = {
  CUBE: "Cube",
  BERET: "Beret",
  DONUT: "Donut",
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
      this.gltfLoader.load(
        path,
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
