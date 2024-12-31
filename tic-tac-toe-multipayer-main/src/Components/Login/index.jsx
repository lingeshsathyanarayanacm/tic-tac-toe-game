import React, { Suspense, useRef } from "react";
import styled from "styled-components";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import Text from "./Text";
import Sky from "./Sky";
import { TextureLoader } from "three";
import { HomeButton } from "../../styles";
function Jumbo() {
  const ref = useRef();
  useFrame(
    ({ clock }) =>
      (ref.current.rotation.x =
        ref.current.rotation.y =
        ref.current.rotation.z =
          Math.sin(clock.getElapsedTime()) * 0.3)
  );
  return (
    <group ref={ref}>
      <Text
        hAlign="right"
        position={window.innerWidth > 767 ? [-15, 15, 0] : [-8, 10, 0]}
        children="TIC"
        fontSize={window.innerWidth > 767 ? 40 : 20}
      />
      <Text
        hAlign="right"
        position={window.innerWidth > 767 ? [-15, -1, 0] : [-8, 0, 0]}
        children="TAC"
        fontSize={window.innerWidth > 767 ? 40 : 20}
      />
      <Text
        hAlign="right"
        position={window.innerWidth > 767 ? [-15, -12, 0] : [-12, -10, 0]}
        children="TOE"
        fontSize={window.innerWidth > 767 ? 40 : 20}
      />
    </group>
  );
}
const Login = ({ signIn }) => {
  const [o, x] = useLoader(TextureLoader, ["/o.png", "/x.png"]);

  return (
    <LoginContainer>
      <Canvas
        camera={{ position: [0, 0, 35] }}
        style={{
          maxHeight: "80vh",
        }}
      >
        <Suspense fallback={null}>
          <Jumbo />
          <Sky pointCount={500} texture={x} size={10} />
          <Sky pointCount={500} texture={o} size={10} />
        </Suspense>
        {/* <OrbitControls /> */}
      </Canvas>
      <HomeButton onClick={signIn}>Sign In with Google</HomeButton>
    </LoginContainer>
  );
};

export default Login;

export const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  background: radial-gradient(
    circle farthest-corner at center top,
    #071021,
    #19324a
  );
`;
