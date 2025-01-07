"use strict";

import GUI from "lil-gui";
import { debugObject, updateCubeGeometry, createMesh } from "./geometry";
import { spin, jump, reset } from "./actions";
import { MODELS, MODEL_TYPES } from "./ModelLoader";

export function initGUI(cubeMesh, scene) {
  // Create a new lil-gui instance
  const gui = new GUI({ width: 300, title: "Threefresher Debugger" });

  //Toggle GUI visibility with 'h' key
  window.addEventListener("keydown", (event) => {
    if (event.key === "h") {
      gui.show(gui._hidden);
    }
  });

  //Folders
  const appearanceFolder = gui.addFolder("Appearance");
  const transformFolder = gui.addFolder("Transform");
  const actionsFolder = gui.addFolder("Actions");
  const modelFolder = gui.addFolder("Model");

  //Color
  appearanceFolder
    .addColor(debugObject, "color")
    .name("Color")
    .onChange(() => {
      cubeMesh.material.color.set(debugObject.color);
    });

  //Wireframe
  appearanceFolder
    .add(cubeMesh.material, "wireframe")
    .name("Wireframe")
    .setValue(false);

  //Visibility
  appearanceFolder.add(cubeMesh, "visible").name("Visible").setValue(true);

  //WidthSegments
  appearanceFolder
    .add(debugObject, "widthSegments")
    .min(1)
    .max(10)
    .step(1)
    .name("Width Segments")
    .onChange(() => {
      updateCubeGeometry(cubeMesh);
    });

  //HeightSegments
  appearanceFolder
    .add(debugObject, "heightSegments")
    .min(1)
    .max(10)
    .step(1)
    .name("Height Segments")
    .onChange(() => {
      updateCubeGeometry(cubeMesh);
    });

  //DepthSegments
  appearanceFolder
    .add(debugObject, "depthSegments")
    .min(1)
    .max(10)
    .step(1)
    .name("Depth Segments")
    .onChange(() => {
      updateCubeGeometry(cubeMesh);
    });

  //Transform Folder
  transformFolder
    .add(cubeMesh.position, "y")
    .min(-2)
    .max(2)
    .step(0.01)
    .name("Elevation");
  transformFolder
    .add(cubeMesh.rotation, "y")
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.01)
    .name("Rotation");
  //   transformFolder
  //     .add(debugObject, "modelScale")
  //     .min(0.5)
  //     .max(2)
  //     .step(0.1)
  //     .name("Scale")
  //     .onChange((value) => {
  //       currentModel.scale.set(value, value, value);
  //     });

  //Actions Folder
  actionsFolder
    .add(debugObject, "jumpHeight")
    .min(1)
    .max(3)
    .step(0.1)
    .name("Jump Height");
  actionsFolder.add({ spin: () => spin(cubeMesh) }, "spin").name("Spin");
  actionsFolder
    .add({ jump: () => jump(cubeMesh, debugObject.jumpHeight) }, "jump")
    .name("Jump");
  actionsFolder.add({ reset: () => reset(cubeMesh) }, "reset").name("Reset");

  // Model Selection
  modelFolder
    .add({ model: "Beret" }, "model", Object.keys(MODELS))
    .onChange(async (value) => {
      const newModel = await createMesh(MODELS[value]);
      scene.remove(scene.getObjectByName("currentModel"));
      newModel.name = "currentModel";
      scene.add(newModel);
    });
}
