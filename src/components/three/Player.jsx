import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";

import useKeyboard from "../../hooks/useKeyboard";
import Gun from "./Gun";

const JUMP_FORCE = 4;
const SPEED = 4;

const Player = () => {
  const velocity = useRef([0, 0, 0]);
  const position = useRef([0, 0, 0]);

  const { camera } = useThree();

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 2.5, 10],
    args: [2],
  }));

  const {
    moveBackward,
    moveForward,
    moveLeft,
    moveRight,
    jump
  } = useKeyboard();

  useEffect(() => {
    api.velocity.subscribe((newVelocity) => {
      velocity.current = newVelocity;
    });
  }, [api.velocity]);

  useEffect(() => {
    api.position.subscribe((newPosition) => {
      position.current = newPosition;
    });
  }, [api.position]);


  useFrame(() => {
    const [x, y, z] = position.current;
    camera.position.copy(new THREE.Vector3(x, y, z));

    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3(0, 0, [moveBackward ? 1 : 0] - moveForward);
    const sideVector = new THREE.Vector3([moveLeft ? 1 : 0] - moveRight, 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    const { x: directionX, z: directionZ } = direction;
    const [velocityX, velocityY, velocityZ] = velocity.current;

    api.velocity.set(directionX, velocityY, directionZ);

    if (jump && Math.abs(velocityY) < 0.05) {
      api.velocity.set(velocityX, JUMP_FORCE, velocityZ);
    }
  }, -1);

  return (
    <>
      <mesh ref={ref} />
      <Gun />
    </>
  );
};

export default Player;
