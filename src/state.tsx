import typesafeContextHook from "typesafe-context-hook";
import { useList } from "react-use";
import { Vector3 } from "@react-three/fiber";

export type Banana = {
  position: Vector3;
};

export const { useGameState, GameStateProvider } = typesafeContextHook(
  "GameState",
  () => {
    const bananas = useList<Banana>([]);

    return { bananas: bananas[0], bananaOps: bananas[1] };
  }
);
