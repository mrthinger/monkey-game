import {Texture, TextureLoader} from "three";

const textureLoader = new TextureLoader();

function loadTexture(path: string) {
  return new Promise<Texture>((resolve) => {
    const texture = textureLoader.load(path, () => resolve(texture));
  });
}

export async function loadAssets () {
  return {
    sprite: {
      monkey: await loadTexture("sprites/monkeyn.png"),
      monkeyBad: await loadTexture("sprites/monkeymad.png"),
      monkeyGood: await loadTexture("sprites/monkey-good.png"),
      banana: await loadTexture("sprites/banana.png"),
    },
  };
};
