import { useFrame } from "@react-three/fiber";
import { World } from "miniplex";
import createReactAPI, { useOnEntityAdded } from "miniplex-react";
import { Ref, RefObject, useEffect, useRef } from "react";
import { useInterval, useList } from "react-use";
import THREE, { Mesh, Sprite, Vector2, Vector3 } from "three";
import typesafeContextHook from "typesafe-context-hook";
import { loadAssets } from "./assets";
import { v4 as uuidv4 } from "uuid";
import { Balloon } from "./entities";

type Entity = {
  id?: string;
  mesh: RefObject<Mesh>;
  velocity?: Vector3;
  banana?: boolean;
  monkey?: boolean;
  trap?: boolean;
  hunger?: number;
  balloon?: boolean;
  health?: number
};

const world = new World<Entity>();

export const ECS = createReactAPI(world);

export const monkeysQuery = ECS.world.with("monkey", "hunger");
export const bananasQuery = ECS.world.with("banana");
export const movingEntities = ECS.world
  .with("mesh", "velocity")
  .without("balloon");
export const balloonsQuery = ECS.world.with("balloon");

export const { useGameState, GameStateProvider } = typesafeContextHook(
  "GameState",
  () => {
    const [bananas, bananasOps] = useList<JSX.Element>([]);
    const [traps, trapsOps] = useList<JSX.Element>([]);
    const [balloons, balloonsOps] = useList<JSX.Element>([]);

    useOnEntityAdded(monkeysQuery, (monkey) => {
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle);
      const y = Math.sin(angle);

      monkey.mesh.current?.position.setX(x * 5);
      monkey.mesh.current?.position.setY(y * 5);

      // ECS.world.addComponent(monkey, "velocity", new Vector3(-x, -y, 0));
    });

    // useFrame((_, dt) => {
    //   for (const entity of movingEntities) {
    //     const mesh = entity.mesh.current;
    //     const velocity = entity.velocity;
    //     if (!mesh) continue;

    //     mesh.position.x += velocity.x * dt;
    //     mesh.position.y += velocity.y * dt;
    //     mesh.position.z += velocity.z * dt;

    //     // entity.velocity.setX(entity.velocity.x - .01) example
    //   }
    // });

    useFrame((_, dt) => {
      for (const balloon of balloonsQuery) {
        const mesh = balloon.mesh.current;
        if (!mesh) continue;
        const direction = new Vector3(
          -mesh.position.x,
          -mesh.position.y,
          -mesh.position.z
        ).normalize();
        const speed = 0.01 * balloon.health!;
        mesh.position.x += direction.x * speed;
        mesh.position.y += direction.y * speed;
        mesh.position.z += direction.z * speed;


        if (mesh.position.length() === 0) {
          console.log("balloon stuck at 0");
          // const angle = Math.random() * Math.PI * 2;
          // const radius = Math.random() * 5; // Random radius up to 5 units
          // const x = Math.cos(angle) * radius;
          // const y = Math.sin(angle) * radius;
          // mesh.position.set(x, y, mesh.position.z);
        }
        if (mesh.position.length() > 0 && mesh.position.length() <= 0.05 ) {
          const balloonIndex = balloons.findIndex(
            (b) => b.props.id == balloon.id
          );
          if (balloonIndex !== -1) balloonsOps.removeAt(balloonIndex);
        }

        // entity.velocity.setX(entity.velocity.x - .01) example
      }
    });


    useFrame(() => {
      for (const monkey of monkeysQuery) {
        if (!monkey.mesh.current) continue;
        let closestBalloon = null;
        let shortestDistance = Infinity;
        for (const balloon of balloonsQuery) {
          if (!balloon.mesh.current) continue;
          const distance = monkey.mesh.current.position.distanceTo(balloon.mesh.current.position);
          if (distance < shortestDistance) {
            shortestDistance = distance;
            closestBalloon = balloon;
          }
        }
        if (closestBalloon && closestBalloon.mesh.current) {
          const direction = new Vector3().subVectors(closestBalloon.mesh.current.position, monkey.mesh.current.position).normalize();
          monkey.mesh.current.position.add(direction.multiplyScalar(0.02));
        }
      }
    });

    useInterval(() => {
      const balloonId = uuidv4();
      const balloon = <Balloon key={balloonId} id={balloonId} />;
      balloonsOps.push(balloon);
      console.log(balloon);
    }, 2000);

    // useFrame(() => {
    //   for (const monkey of monkeysQuery) {
    //     console.log(`Monkey Hunger: ${monkey.hunger}`, { monkey });
    //   }
    // });

    return { bananas, bananasOps, traps, trapsOps, balloons, balloonsOps };
  }
);
