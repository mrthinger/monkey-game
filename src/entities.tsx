import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { assets } from "./assets";
import { ECS } from "./state";
import { Mesh, Vector3, SpriteMaterial } from "three";

export function Banana(props: { initialPosition: Vector3 }) {
  const meshRef = useRef<Mesh>(null!);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(props.initialPosition);
    }
  }, [props, meshRef]);

  useFrame((_state, delta) => (meshRef.current.position.x += delta));

  return (
    <ECS.Entity>
      <ECS.Component name="mesh">
        <mesh ref={meshRef}>
          <sprite
            material={new SpriteMaterial({ map: assets.sprite.banana })}
          />
        </mesh>
      </ECS.Component>
    </ECS.Entity>
  );
}
