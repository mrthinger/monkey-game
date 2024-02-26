/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { assets } from "./assets";
import { ECS } from "./state";
import { Mesh, Vector3, SpriteMaterial } from "three";

export function Banana() {
  const meshRef = useRef<Mesh>(null!);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(new Vector3());

  const onPointerDown = (event: any) => {
    event.stopPropagation();
    setIsDragging(true);
    event.target.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: any) => {
    if (isDragging) {
      setDragPosition(
        new Vector3(event.unprojectedPoint.x, event.unprojectedPoint.y, meshRef.current.position.z)
      );
    }
  };

  const onPointerUp = (event: any) => {
    event.stopPropagation();
    setIsDragging(false);
    event.target.releasePointerCapture(event.pointerId);
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
