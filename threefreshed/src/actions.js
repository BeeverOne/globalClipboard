"use strict";

import gsap from "gsap";

export function spin(cubeMesh) {
  gsap.to(cubeMesh.rotation, {
    y: cubeMesh.rotation.y + Math.PI * 2,
    ease: "elastic.out(1, 0.3)",
  });
}

export function jump(cubeMesh, jumpHeight /*= 1*/) {
  const originalY = 0;
  const jumpTimeline = gsap.timeline();

  jumpTimeline
    //Anticipation
    .to(cubeMesh.position, {
      y: -0.2,
      duration: 0.2,
      ease: "power2.inOut",
    })
    //Quick, powerful launch upwards
    .to(cubeMesh.position, { y: jumpHeight, duration: 0.5, ease: "power4.out" })
    //Hold in the air
    .to(cubeMesh.position, { y: jumpHeight, duration: 0.1, ease: "none" })
    //Fall down with slight overshoot
    .to(cubeMesh.position, { y: originalY, duration: 0.5, ease: "bounce.out" });
}
export function reset(cubeMesh) {
  cubeMesh.position.set(0, 0, 0);
  cubeMesh.rotation.set(0, 0, 0);
}
