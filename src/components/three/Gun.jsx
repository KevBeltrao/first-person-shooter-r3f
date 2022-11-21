import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const Gun = () => {
  const { scene } = useGLTF('/space_gun/scene.gltf'); // https://sketchfab.com/3d-models/space-gun-50c2a399a6564f93ba4e01a723b08e1a

  const ref = useRef();

  useFrame(({ camera }) => {
    ref.current.position.copy(camera.position);
    ref.current.quaternion.copy(camera.quaternion);

    ref.current.translateX(Math.PI / 4); // side
    ref.current.translateY(-1); // height
    ref.current.translateZ(-1); // depth

    ref.current.rotateY(Math.PI);
  });

  return <primitive ref={ref} object={scene} scale={0.2} />;
};

export default Gun;
