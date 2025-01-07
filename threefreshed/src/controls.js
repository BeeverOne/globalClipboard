"use strict";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function initControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  return controls;
}
