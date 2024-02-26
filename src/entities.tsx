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
      <ECS.Component name="banana" data={true} />
      <ECS.Component name="mesh" data={meshRef}>
        <mesh ref={meshRef}>
          <sprite
            material={new SpriteMaterial({ map: assets.sprite.banana })}
          />
        </mesh>
      </ECS.Component>
    </ECS.Entity>
  );
}

export function Monkey() {
  const meshRef = useRef<Mesh>(null);

  return (
    <ECS.Entity>
      <ECS.Component name="monkey" data={true} />
      <ECS.Component name="mesh" data={meshRef}>
        <mesh ref={meshRef}>
          <sprite
            material={new SpriteMaterial({ map: assets.sprite.monkey })}
          />
        </mesh>
      </ECS.Component>
    </ECS.Entity>
  );
}

export function Trap(props: { initialPosition: Vector3 }) {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.copy(props.initialPosition);
    }
  }, [props, meshRef]);

  return (
    <ECS.Entity>
      <ECS.Component name="trap" data={true} />
      <ECS.Component name="mesh" data={meshRef}>
        <mesh ref={meshRef}>
          <sprite
            material={new SpriteMaterial({ map: assets.sprite.trap })}
          />
        </mesh>
      </ECS.Component>
    </ECS.Entity>
  );
}
