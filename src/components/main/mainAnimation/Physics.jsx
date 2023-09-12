import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";

import Skin01 from "../../../images/1.png";
import Skin02 from "../../../images/2.png";
import Skin03 from "../../../images/3.png";
import Skin04 from "../../../images/4.png";

const _ = () => {
  return (
    <>
      <Canvas>
        <ambientLight intensity={0.2} />
        <Physics>
          <Box position={[0, 0, 0]} />
          <PlaneBox position={[0, 0, 0]} />
        </Physics>
      </Canvas>
    </>
  );
};

export default _;

function Box(props) {
  const [mesh, api] = useBox(() => ({ mass: 1, position: [0, -2, 0] }));
  const skin = useTexture({
    normalMap: Skin01,
    displacement: Skin02,
    ambient: Skin03,
    specular: Skin04,
  });
  // This reference will give us direct access to the THREE.Mesh object
  // Set up state for the hovered and active state
  // const [hovered, setHover] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => {
  //   ref.current.rotation.x += random(0.005, 0.01, 0.002);
  //   ref.current.rotation.y += random(0.005, 0.01, 0.002);
  // });

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={0.5}
      onPointerOver={(event) => {
        api.velocity.set(0, 4, 0);
      }}
    >
      <pointLight
        position={[10, 15, 10]}
        angle={0.5}
        color="#b11919"
        intensity={1}
      />
      <pointLight
        position={[-10, -15, -10]}
        angle={-0.5}
        color="#7eec35"
        intensity={1}
      />
      <OrbitControls />
      <sphereGeometry attach="geometry" />
      <meshStandardMaterial attach="material" {...skin} />
    </mesh>
  );
}

function PlaneBox(props) {
  const [mesh] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -1.6, 0],
  }));
  // This reference will give us direct access to the THREE.Mesh object
  // Set up state for the hovered and active state
  // const [hovered, setHover] = useState(false);
  // const [active, setActive] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => {
  //   ref.current.rotation.x += random(0.005, 0.01, 0.002);
  //   ref.current.rotation.y += random(0.005, 0.01, 0.002);
  // });

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={0.5}
      // onClick={(event) => setActive(!active)}
      // onPointerOver={(event) => setHover(true)}
      // onPointerOut={(event) => setHover(false)}
      // attach="geometry"
      // onPointerMove={(e) => console.log(e.clientX)}
    >
      <OrbitControls />
      <circleBufferGeometry attach="geometry" args={[3, 64]} />
      {/* <meshNormalMaterial attach="material" color="hotpink" /> */}
      <meshStandardMaterial attach="material" color="slateblue" />
    </mesh>
  );
}
