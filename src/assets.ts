import { TextureLoader } from "three";

const textureLoader = new TextureLoader();

export function loadAssets() {
  return {
    sprite: {
      monkey: textureLoader.load("sprites/monkeyn.png"),
      monkeyBad: textureLoader.load("sprites/monkeymad.png"),
      monkeyGood: textureLoader.load("sprites/monkey-good.png"),
      banana: textureLoader.load("sprites/banana.png"),
      trap: textureLoader.load("sprites/trap.png"),
      farm: textureLoader.load("sprites/farm.png"),
    },
  };
}

export const assets = loadAssets();
