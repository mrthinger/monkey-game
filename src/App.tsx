import { Box, OrthographicCamera } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Banana, Monkey, Trap } from "./entities";
import { useGameState } from "./state";
import { v4 as uuidv4 } from "uuid";

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

  useFrame((_state, delta) => (meshRef.current.rotation.z += delta));
  const { bananasOps } = useGameState();

  const onClick = () => {
    e.stopPropagation();
    bananasOps.push(<Banana key={uuidv4()} />);
  };

  return <Box onClick={onClick} ref={meshRef} args={[1, 1, 1]} />;
}

function App() {
  const { bananas, traps } = useGameState();

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
      <Monkey />
    </>
  );
}

export default App;
