import { Canvas } from "@react-three/fiber";
import { Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { Perf } from 'r3f-perf';

import FirstPersonView from "./components/three/FirstPersonView";
import Ground from "./components/three/Ground";
import Player from "./components/three/Player";
import Lights from "./components/three/Lights";

import "./App.css";

export default function App() {
  return (
    <>
      <Canvas>
        <Perf />

        <Sky sunPosition={[1, 2, 3]} />
        <Lights />

        <FirstPersonView />

        <Physics>
          <Player />
          <Ground />
        </Physics>
      </Canvas>
    </>
  );
}
