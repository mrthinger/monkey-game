import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { Box, OrthographicCamera } from "@react-three/drei";
import { ECS, EntityType } from "./state";
import { loadAssets } from "./assets";

import { useEntities } from "miniplex-react";

const assets = await loadAssets();

function Farm(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_state, delta) => (meshRef.current.rotation.z += delta));

  const onClick = () => {
    const x = Math.random() * 2 - 1;
    const y = Math.random() * 2 - 1;
    const z = Math.random() * 2 - 1;
    const randomPosition = new THREE.Vector3(x, y, z)
      .normalize()
      .multiplyScalar(1)
      .add(meshRef.current.position);

    ECS.world.add({
      type: EntityType.Banana,
      position: {
        x: randomPosition.x,
        y: randomPosition.y,
        z: randomPosition.z,
      },
      velocity: {
        x: randomPosition.x,
        y: randomPosition.y,
        z: randomPosition.z,
      },
    });
  };

  return <Box onClick={onClick} ref={meshRef} args={[1, 1, 1]} />;
}

function Entities() {
  const bananasQuery = ECS.world.with("position", "velocity");
  const bananas = useEntities(bananasQuery);

  useFrame((_, dt) => {
    for (const e of bananasQuery) {
      const nPos = {
        x: e.position.x + 0.01,
        y: e.position.y,
        z: e.position.z,
      };
      ECS.world.removeComponent(e, "position");
      ECS.world.addComponent(e, "position", nPos);
    }
  });

  return bananas.entities.map((banana) => {
    console.log(banana);
    return (
      <mesh
        key={ECS.world.id(banana)}
        position={[banana.position.x, banana.position.y, 0]}
      >
        <sprite
          material={new THREE.SpriteMaterial({ map: assets.sprite.banana })}
        />
      </mesh>
    );
  });
}

function App() {
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
      <Entities />
    </>
  );
}

export default App;
