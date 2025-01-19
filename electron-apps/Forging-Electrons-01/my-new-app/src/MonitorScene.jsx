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
import { Euler, Vector3, AxesHelper, MeshPhysicalMaterial, Mesh } from "three";

function Rig() {
  const { camera, mouse } = useThree();
  const vec = new Vector3();

  return useFrame(() => {
    camera.position.lerp(vec.set(mouse.x, mouse.y, camera.position.z), 0.5);
    camera.lookAt(0, 0, 0);
  });
}

function MonitorModel() {
  const ref = useRef();
  //Load OBJ
  const obj = useLoader(
    OBJLoader,
    "../public/models/Monitor Curved/monitor.obj"
  );
  const material = new MeshPhysicalMaterial({
    color: "#676464",
    metalness: 0.2,
    roughness: 0.8,
    transmission: 0.4,
    transparent: true,
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
      ref={ref}
      object={obj}
      //   onPointerOver={() => setHovered(true)}
      //   onPointerOut={() => setHovered(false)}
      rotation={[0, -Math.PI / 2, 0]}
      position={[-5, 0, 0]}
    />
  );
}

function Camera() {
  const cameraRef = useRef();

  // You can adjust these values to change the camera rotation
  const rotation = new Euler(
    Math.PI * 0.1, // X rotation (pitch) in radians
    Math.PI * 0, // Y rotation (yaw) in radians
    Math.PI * 0 // Z rotation (roll) in radians
  );
  const { viewport } = useThree();
  const { size, setDefaultCamera } = useThree();

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.rotation.copy(rotation);
      // Adjust FOV based on aspect ratio
      cameraRef.current.fov = viewport.aspect < 1 ? 100 : 80;
      cameraRef.current.updateProjectionMatrix();
    }
  });

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
      style={{ width: "400px", height: "300px", background: "transparent" }}
      gl={{ alpha: true }} // Ensures transparency
      //   camera={{ position: [0, 0, 5] }}
    >
      <Camera />
      <Stage
        intensity={1}
        environment="city"
        shadows={{ type: "accumulative", bias: -0.001, intensity: Math.PI }}
        adjustCamera={true}
      ></Stage>
      {/* <Grid
        renderOrder={-1}
        position={[0, -9, 0]}
        infiniteGrid
        cellSize={0.6}
        cellThickness={1}
        sectionSize={3.3}
        sectionThickness={1.5}
        sectionColor={[0.5, 0.5, 10]}
        fadeDistance={30}
      /> */}
      <ambientLight intensity={0.4} color="red" />
      <directionalLight position={[10, 10, 5]} />
      <MonitorModel />
      <Rig />
      <Stats />
      <OrbitControls
        // autoRotate
        // autoRotateSpeed={0.05}
        makeDefault
        // minPolarAngle={Math.PI / 2}
        // maxPolarAngle={Math.PI / 2}
        enableZoom={true}
        enableRotate={true} // Disable rotation
        enablePan={true} // Disable panning
        // target={[0, 0, 0]} // Look at the origin
      />
      <Environment files="../public/hdr/small-studio.hdr" background={false} />
    </Canvas>
  );
}
