import typesafeContextHook from "typesafe-context-hook";
import { useList } from "react-use";
import { World } from "miniplex";
import { useState } from "react";
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
  position: Vector3;
  velocity?: Vector3;
  sprite?: Sprite;
};

const world = new World<Entity>();

export const ECS = createReactAPI(world);
