import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { Box, OrthographicCamera, Text } from "@react-three/drei";
import { Banana, useGameState } from "./state";

function Farm(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);

  const state = useGameState();

  useFrame((_state, delta) => (meshRef.current.rotation.z += delta));
  const onClick = () => {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    const z = Math.random() * 2 - 1;
    const randomPosition = new THREE.Vector3(x, y, z)
      .normalize()
      .multiplyScalar(1)
      .add(meshRef.current.position);

    const banana: Banana = {
      position: randomPosition,
    };

    state.bananaOps.push(banana);
  };

  return (
    <>
      <Text color="black" position={[0, 0, 1]} scale={0.1}>
        FARM
      </Text>
      <Box
        onClick={onClick}
        ref={meshRef}
        {...props}
        args={[1, 1, 1]}
        material-color="green"
      />
    </>
  );
}

function App() {
  const state = useGameState();

  return (
    <Canvas>
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
      {state.bananas.map((banana, index) => (
        <mesh key={index} position={banana.position}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="yellow" />
        </mesh>
      ))}
    </Canvas>
  );
}

export default App;