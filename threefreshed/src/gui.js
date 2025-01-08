"use strict";

import GUI from "lil-gui";
import {
  debugObject,
  updateCubeGeometry,
  createMesh,
  switchModel,
} from "./geometry";
import { spin, jump, reset } from "./actions";
import { MODELS, MODEL_TYPES } from "./ModelLoader";

export function initGUI(currentModel, scene) {
  // Create a new lil-gui instance
  const gui = new GUI({ width: 300, title: "Threefresher Debugger" });

  //Update GUI controls
  function updateGUIControls(newModel) {
    // Remove existing folders
    if (transformFolder) transformFolder.destroy();
    if (appearanceFolder) appearanceFolder.destroy();
    if (actionsFolder) actionsFolder.destroy();

    // Recreate Transform Controls
    transformFolder = gui.addFolder("Transform");

    transformFolder
      .add(newModel.position, "y")
      .min(-3)
      .max(3)
      .step(0.1)
      .name("Elevation");

    transformFolder
      .add(newModel.rotation, "y")
      .min(-Math.PI)
      .max(Math.PI)
      .step(0.01)
      .name("Rotation");

    // Add Scale Controls to Transform Folder
    transformFolder
      .add(debugObject, "modelScale", 0.1, 5)
      .name("Scale")
      .onChange(() => {
        newModel.scale.set(
          debugObject.modelScale,
          debugObject.modelScale,
          debugObject.modelScale
        );
      });

    transformFolder
      .add(
        {
          resetScale: () => {
            debugObject.modelScale = 1;
            newModel.scale.set(1, 1, 1);
          },
        },
        "resetScale"
      )
      .name("Reset Scale");

    // Recreate Material Controls
    appearanceFolder = gui.addFolder("Appearance");
    appearanceFolder
      .addColor(debugObject, "color")
      .name("Color")
      .onChange(() => {
        newModel.traverse((child) => {
          if (child.isMesh) {
            child.material.color.set(debugObject.color);
          }
        });
      });

    // Recreate Action Controls
    actionsFolder = gui.addFolder("Actions");
    actionsFolder
      .add(debugObject, "jumpHeight")
      .min(1)
      .max(3)
      .step(0.1)
      .name("Jump Height");
    actionsFolder.add({ spin: () => spin(newModel) }, "spin").name("Spin");
    actionsFolder
      .add({ jump: () => jump(newModel, debugObject.jumpHeight) }, "jump")
      .name("Jump");
    actionsFolder.add({ reset: () => reset(newModel) }, "reset").name("Reset");
  }

  //Toggle GUI visibility with 'h' key
  window.addEventListener("keydown", (event) => {
    if (event.key === "h") {
      gui.show(gui._hidden);
    }
  });

  //Folders
  let modelFolder = gui.addFolder("Model");
  let appearanceFolder = gui.addFolder("Appearance");
  let transformFolder = gui.addFolder("Transform");
  let actionsFolder = gui.addFolder("Actions");

  // Add file upload control to model folder
  modelFolder
    .add(
      {
        loadFile: () => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = ".glb,.gltf";
          input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
              const url = URL.createObjectURL(file);
              try {
                const oldModel = scene.getObjectByName("currentModel");
                if (oldModel) scene.remove(oldModel);

                const newModel = await createMesh(url);
                newModel.name = "currentModel";
                scene.add(newModel);
                updateGUIControls(newModel);
                URL.revokeObjectURL(url);
              } catch (error) {
                console.error("Failed to load model:", error);
                URL.revokeObjectURL(url);
              }
            }
          };
          input.click();
        },
      },
      "loadFile"
    )
    .name("Load Model File");

  // Model Selection
  modelFolder
    .add({ currentModel: "BERET" }, "currentModel", Object.keys(MODEL_TYPES))
    .name("Choose Model")
    .onChange(async (value) => {
      const oldModel = scene.getObjectByName("currentModel");
      if (oldModel) scene.remove(oldModel);

      const newModel = await switchModel(MODEL_TYPES[value]);
      newModel.name = "currentModel";
      scene.add(newModel);
      updateGUIControls(newModel); //FLAG
    });

  //Color
  appearanceFolder
    .addColor(debugObject, "color")
    .name("Color")
    .onChange(() => {
      if (!currentModel) return;

      currentModel.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.color.set(debugObject.color);
        }
      });
    });

  //Wireframe
  appearanceFolder
    .add(currentModel.material, "wireframe")
    .name("Wireframe")
    .setValue(false);

  //Visibility
  appearanceFolder.add(currentModel, "visible").name("Visible").setValue(true);

  //WidthSegments
  appearanceFolder
    .add(debugObject, "widthSegments")
    .min(1)
    .max(10)
    .step(1)
    .name("Width Segments")
    .onChange(() => {
      updateCubeGeometry(currentModel);
    });

  //HeightSegments
  appearanceFolder
    .add(debugObject, "heightSegments")
    .min(1)
    .max(10)
    .step(1)
    .name("Height Segments")
    .onChange(() => {
      updateCubeGeometry(currentModel);
    });

  //DepthSegments
  appearanceFolder
    .add(debugObject, "depthSegments")
    .min(1)
    .max(10)
    .step(1)
    .name("Depth Segments")
    .onChange(() => {
      updateCubeGeometry(currentModel);
    });

  //Transform Folder
  transformFolder
    .add(currentModel.position, "y")
    .min(-2)
    .max(2)
    .step(0.01)
    .name("Elevation");
  transformFolder
    .add(currentModel.rotation, "y")
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
  actionsFolder.add({ spin: () => spin(currentModel) }, "spin").name("Spin");
  actionsFolder
    .add({ jump: () => jump(currentModel, debugObject.jumpHeight) }, "jump")
    .name("Jump");
  actionsFolder
    .add({ reset: () => reset(currentModel) }, "reset")
    .name("Reset");
}
