import typesafeContextHook from "typesafe-context-hook";
import { useList } from "react-use";
import { World } from "miniplex";
import { useState } from "react";
import createReactAPI from "miniplex-react";
import { Vector3 } from "@react-three/fiber";
import { Sprite } from "three";

// type enum for banana, monkey, farm
enum EntityType {
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
  type: EntityType.Monkey;
  position: Vector3;
  velocity: Vector3;
  sprite: Sprite;
};

const world = new World<Entity>();

export const ECS = createReactAPI(world);
