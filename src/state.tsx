import { World } from "miniplex";
import createReactAPI from "miniplex-react";
import { Sprite, Vector3 } from "three";

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
  type: EntityType;
  position: { x: number; y: number };
  velocity?: { x: number; y: number };
  sprite?: Sprite;
};

const world = new World<Entity>();

export const ECS = createReactAPI(world);
