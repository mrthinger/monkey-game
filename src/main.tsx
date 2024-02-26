import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import { GameStateProvider } from "./state.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Canvas>
      <GameStateProvider>
        <App />
      </GameStateProvider>
    </Canvas>
  </React.StrictMode>
);
