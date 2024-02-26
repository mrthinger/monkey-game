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

const movingQuery = ECS.world.with("position", "velocity");
const bananas = ECS.world.where((e) => e.type === EntityType.Banana);
const monkey = ECS.world.where((e) => e.type === EntityType.Monkey);

function Entities() {
  const movingItems = useEntities(movingQuery);

  useFrame((_, dt) => {
    for (const e of movingQuery) {
      const nPos = {
        x: e.position.x + e.velocity.x * dt,
        y: e.position.y + e.velocity.y * dt,
      };
      ECS.world.removeComponent(e, "position");
      ECS.world.addComponent(e, "position", nPos);
    }
  });

  const [lastMonkeySpawn, setLastMonkeySpawn] = useState(0);

  useFrame((_, dt) => {
    if (lastMonkeySpawn > 1) {
      const x = Math.random() * 2 - 1;
      const y = Math.random() * 2 - 1;
      ECS.world.add({
        type: EntityType.Monkey,
        position: { x: x * 10, y: y * 10 },
        velocity: { x: -x, y: -y },
      });
      setLastMonkeySpawn(0);
    } else {
      setLastMonkeySpawn((old) => old + dt);
    }
  });

  return (
    <>
      <ECS.Entities in={bananas}>
        {(banana) => {
          return (
            <mesh
              key={ECS.world.id(banana)}
              position={[banana.position.x, banana.position.y, 0]}
            >
              <sprite
                material={
                  new THREE.SpriteMaterial({ map: assets.sprite.banana })
                }
              />
            </mesh>
          );
        }}
      </ECS.Entities>
      <ECS.Entities in={monkey}>
        {(banana) => {
          return (
            <mesh
              key={ECS.world.id(banana)}
              position={[banana.position.x, banana.position.y, 0]}
            >
              <sprite
                material={
                  new THREE.SpriteMaterial({ map: assets.sprite.monkey })
                }
              />
            </mesh>
          );
        }}
      </ECS.Entities>
    </>
  );
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
