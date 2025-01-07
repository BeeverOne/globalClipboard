"use strict";

import * as THREE from "three";

// Create an ambient light for general scene illumination
export const ambientLight = new THREE.AmbientLight(0x404040, 1);

// Create a directional light (like sunlight)
export const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;

// Create a point light (light radiating from a point)
export const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 5, 0);
pointLight.castShadow = true;

// Helper function to create all lights at once
export function createLights() {
  return {
    ambient: ambientLight,
    directional: directionalLight,
    point: pointLight,
  };
}
