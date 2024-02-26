import { Box, OrthographicCamera } from "@react-three/drei";
import { ThreeElements, ThreeEvent, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Banana, Monkey, Trap } from "./entities";
import { useGameState } from "./state";
import { v4 as uuidv4 } from "uuid";
import { assets } from "./assets";

function Land() {
  const meshRef = useRef<THREE.Mesh>(null!);

  const { trapsOps } = useGameState();

  return (
    <Box
      onClick={(e) => {
        trapsOps.push(<Trap key={uuidv4()} initialPosition={e.point} />);
      }}
      ref={meshRef}
      args={[10, 10, 0]}
    >
      <meshBasicMaterial color={new THREE.Color("#97c566")}></meshBasicMaterial>
    </Box>
  );
}

function Farm(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);

  return (
    <mesh ref={meshRef}>
      <sprite
        scale={[2, 2, 2]}
        material={new THREE.SpriteMaterial({ map: assets.sprite.farm })}
      />
    </mesh>
  );
}

function App() {
  const { bananas, traps, balloons } = useGameState();

  return (
    <>
      <OrthographicCamera
        makeDefault
        zoom={100}
        position={[0, 0, 100]}
        near={0.1}
        far={1000}
      />
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <axesHelper scale={2} />
      <Land />
      <Farm position={[0, 0, 0]} />
      {bananas}
      {traps}
      {balloons}
      <Monkey />
      <Monkey />
      <Monkey />
    </>
  );
}

export default App;
