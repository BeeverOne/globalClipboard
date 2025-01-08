"use strict";

import { initGUI } from "./gui";
import { createMesh } from "./geometry";

export function initDragAndDrop(scene) {
  window.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  });

  window.addEventListener("drop", async (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    if (file && (file.name.endsWith(".glb") || file.name.endsWith(".gltf"))) {
      const url = URL.createObjectURL(file);
      try {
        const oldModel = scene.getObjectByName("currentModel");
        if (oldModel) scene.remove(oldModel);

        const newModel = await createMesh(url);
        newModel.name = "currentModel";
        scene.add(newModel);
        //Update GUI Controls
        initGUI(newModel, scene);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.log("Failed to load model:", error);
        URL.revokeObjectURL(url);
      }
    }
  });
}
