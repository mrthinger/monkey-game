import { Box, OrthographicCamera } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Banana } from "./entities";
import { useGameState } from "./state";
import { v4 as uuidv4 } from "uuid";

function Farm(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_state, delta) => (meshRef.current.rotation.z += delta));
  const { bananasOps } = useGameState();

  const onClick = () => {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    const z = Math.random() * 2 - 1;
    const randomPosition = new THREE.Vector3(x, y, z)
      .normalize()
      .multiplyScalar(1)
      .add(meshRef.current.position);

    bananasOps.push(<Banana key={uuidv4()} initialPosition={randomPosition} />);
  };

  return <Box onClick={onClick} ref={meshRef} args={[1, 1, 1]} />;
}

function App() {
  const { bananas } = useGameState();

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
      <Farm position={[0, 0, 0]} />
      {bananas}
    </>
  );
}

export default App;
