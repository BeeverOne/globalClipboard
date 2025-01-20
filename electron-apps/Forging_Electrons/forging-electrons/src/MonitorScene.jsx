import React, { useRef, useEffect } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Stats,
  Stage,
  Grid,
  Environment,
} from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Euler, Vector3, MeshPhysicalMaterial, Mesh } from "three";

function Rig() {
  const { camera, pointer, viewport } = useThree();
  const vec = new Vector3();

  return useFrame(() => {
    camera.position.lerp(
      vec.set(-pointer.x, -pointer.y, camera.position.z),
      0.2
    );
    camera.lookAt(0, 0, 0);
  });
}

function MonitorModel() {
  const monitorRef = useRef();
  //

  //Load OBJ
  const obj = useLoader(OBJLoader, "/models/Monitor Curved/monitor.obj");
  const material = new MeshPhysicalMaterial({
    color: "#676464",
    metalness: 0.2,
    roughness: 0.8,
    transmission: 0.4,
    transparent: false,
    opacity: 0.8,
    reflectivity: 0.2,
    ior: 1.8,
    thickness: 0.7,
    clearcoat: 1,
    clearcoatRoughness: 0,
    iridescence: 0.96,
  });

  obj.traverse((child) => {
    if (child instanceof Mesh) {
      child.material = material;
    }
  });

  return (
    <primitive
      ref={monitorRef}
      object={obj}
      rotation={[0, -Math.PI / 2, 0]}
      position={[-5, 0, 0]}
    />
  );
}

function Camera() {
  const cameraRef = useRef();
  const { size } = useThree();

  useEffect(() => {
    if (!cameraRef.current) return;
    cameraRef.current.aspect = size.width / size.height;
    cameraRef.current.updateProjectionMatrix();
  }, [size]);

  // Adjust these to change camera rotation
  //   const rotation = new Euler(
  //     Math.PI * 0.1, // X rotation (pitch) in radians
  //     Math.PI * 0, // Y rotation (yaw) in radians
  //     Math.PI * 0 // Z rotation (roll) in radians
  //   );

  //   const { viewport } = useThree();

  //   useFrame(() => {
  //     if (cameraRef.current) {
  //       cameraRef.current.rotation.copy(rotation);

  //       cameraRef.current.updateProjectionMatrix();
  //     }
  //   });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 25]}
      fov={80}
      near={0.01}
      far={1000}
    />
  );
}

export default function MonitorScene() {
  return (
    <Canvas
      style={{ width: "100%", height: "100%", background: "transparent" }}
      gl={{ alpha: true }}
    >
      <Camera />
      <Stage
        intensity={1}
        environment="city"
        shadows={{ type: "accumulative", bias: -0.001, intensity: Math.PI }}
        adjustCamera={false}
      ></Stage>
      <Grid
        renderOrder={-1}
        position={[0, -9, 0]}
        infiniteGrid
        cellSize={0.6}
        cellThickness={1}
        sectionSize={3.3}
        sectionThickness={1.5}
        sectionColor={[0.5, 0.5, 10]}
        fadeDistance={30}
      />
      <ambientLight intensity={0.4} color="red" />
      <directionalLight position={[10, 10, 5]} />
      <MonitorModel />
      <Rig />
      <Stats />
      <OrbitControls
        enabled={false}
        makeDefault
        // minPolarAngle={Math.PI / 2}
        // maxPolarAngle={Math.PI / 2}
        enableZoom={true}
        enableRotate={true} // Disable rotation
        enablePan={true} // Disable panning
      />
      <Environment files="/hdr/small-studio.hdr" background={false} />
    </Canvas>
  );
}
