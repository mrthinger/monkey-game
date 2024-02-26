import { useFrame } from "@react-three/fiber";
import { World } from "miniplex";
import createReactAPI from "miniplex-react";
import { Ref, useEffect, useRef } from "react";
import { useList } from "react-use";
import THREE, { Mesh, Sprite, Vector3 } from "three";
import typesafeContextHook from "typesafe-context-hook";
import { loadAssets } from "./assets";

// type enum for banana, monkey, farm
export enum EntityType {
  Banana,
  Monkey,
  Farm,
  Trap,
}

type Health = {
  current: number;
  max: number;
};

type Entity = {
  mesh: Ref<Mesh>;
};

const world = new World<Entity>();

export const ECS = createReactAPI(world);


export const { useGameState, GameStateProvider } = typesafeContextHook(
  "GameState",
  () => {
    const [bananas, bananasOps] = useList<JSX.Element>([]);

    return { bananas, bananasOps };
  }
);
