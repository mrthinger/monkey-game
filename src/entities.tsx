/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { assets } from "./assets";
import { ECS, bananasQuery, monkeysQuery, useGameState } from "./state";
import { Mesh, Vector3, SpriteMaterial } from "three";
import { useOnEntityAdded } from "miniplex-react";

export function Banana({ id }: { id: string }) {
  const meshRef = useRef<Mesh>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(new Vector3());
  const { bananasOps } = useGameState();

  useOnEntityAdded(bananasQuery, (banana) => {
    const angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle);
    const y = Math.sin(angle);

    banana?.mesh.current?.position.setX(x * 4);
    banana?.mesh.current?.position.setY(y * 4);
    banana?.mesh.current?.position.setZ(50);
  });

  const onPointerDown = (event: any) => {
    event.stopPropagation();
    setIsDragging(true);
    event.target.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: any) => {
    if (isDragging) {
      setDragPosition(
        new Vector3(
          event.unprojectedPoint.x,
          event.unprojectedPoint.y,
          meshRef.current?.position.z
        )
      );
    }
  };

  const onPointerUp = (event: any) => {
    event.stopPropagation();
    setIsDragging(false);
    event.target.releasePointerCapture(event.pointerId);

    for (const monkey of monkeysQuery) {
      if (!monkey.mesh.current || !meshRef.current) continue;
      if (
        monkey.mesh.current.position.distanceTo(meshRef.current.position) <= 1
      ) {
        monkey.hunger += 1;
        bananasOps.filter((banana) => banana.props.id !== id);
      }
    }
  };

  useFrame(() => {
    if (isDragging && meshRef.current) {
      meshRef.current.position.copy(dragPosition);
    }
  });

  return (
    <ECS.Entity>
      <ECS.Component name="banana" data={true} />
      <ECS.Component name="mesh" data={meshRef}>
        <mesh
          ref={meshRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
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
      <ECS.Component name="hunger" data={0} />
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
