import { usePlane } from "@react-three/cannon";
import { tileTexture } from "../../textures";

const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0.5, 0]
  }));

  tileTexture.repeat.set(100, 100);

  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={tileTexture} color="#888888" />
    </mesh>
  );
};

export default Ground;
