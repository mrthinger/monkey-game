import { useFrame } from "@react-three/fiber";
import { World } from "miniplex";
import createReactAPI, { useOnEntityAdded } from "miniplex-react";
import { Ref, RefObject, useEffect, useRef } from "react";
import { useList } from "react-use";
import THREE, { Mesh, Sprite, Vector2, Vector3 } from "three";
import typesafeContextHook from "typesafe-context-hook";
import { loadAssets } from "./assets";

type Entity = {
  mesh: RefObject<Mesh>;
  velocity?: Vector3;
  banana?: boolean;
  monkey?: boolean;
};

const world = new World<Entity>();

export const ECS = createReactAPI(world);

const monkeysQuery = ECS.world.with("monkey");
const movingEntities = ECS.world.with("mesh", "velocity")

export const { useGameState, GameStateProvider } = typesafeContextHook(
  "GameState",
  () => {
    const [bananas, bananasOps] = useList<JSX.Element>([]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useOnEntityAdded(monkeysQuery, (monkey) => {
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle);
      const y = Math.sin(angle);

      monkey.mesh.current?.position.setX(x * 2);
      monkey.mesh.current?.position.setY(y * 2);


      ECS.world.addComponent(monkey, "velocity", new Vector3(-x, -y, 0))
    });


    useFrame((_, dt) => {
      for (const entity of movingEntities) {
        const mesh = entity.mesh.current;
        const velocity = entity.velocity;
        if(!mesh) continue

        mesh.position.x += velocity.x * dt
        mesh.position.y += velocity.y * dt
        mesh.position.z += velocity.z * dt


        // entity.velocity.setX(entity.velocity.x - .01) example
      }
    })

    

    return { bananas, bananasOps };
  }
);
