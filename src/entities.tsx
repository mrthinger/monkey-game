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

export function Monkey(props: { initialPosition?: Vector3 }) {
  const meshRef = useRef<Mesh>(null!);

  useEffect(() => {
    if (meshRef.current) {
      let initPos: Vector3 | undefined;

      if (props.initialPosition == null) {
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle);
        const y = Math.sin(angle);

        initPos = new Vector3(x, y, 0);
      } else {
        initPos = props.initialPosition;
      }

      meshRef.current.position.copy(initPos);
    }
  }, [props, meshRef]);

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
