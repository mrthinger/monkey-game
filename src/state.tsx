import typesafeContextHook from "typesafe-context-hook";
import { useList } from "react-use";
import { World } from "miniplex";
import { useState } from "react";
import createReactAPI from "miniplex-react"
import { Vector3 } from "@react-three/fiber";


// type enum for banana, monkey, farm
type Entity = {
  position: Vector3;
  isBanana: boolean;
};

const world = new World<Entity>();

export const ECS = createReactAPI(world)

// export const { useGameState, GameStateProvider } = typesafeContextHook(
//   "GameState",
//   () => {

//     world.add({ position: new Vector3(), isBanana: true });

//     const bananasQuery = world.with("isBanana");

//     return { bananasQuery, world };
//   }
// );
