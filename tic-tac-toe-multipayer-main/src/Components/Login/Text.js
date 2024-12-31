import * as THREE from "three";
import React, { useMemo, useRef, useLayoutEffect } from "react";
import { useLoader } from "@react-three/fiber";

export default function Text({
  children,
  vAlign = "center",
  hAlign = "center",
  size = 1.5,
  fontSize,
  color = "#000000",
  ...props
}) {
  const font = useLoader(THREE.FontLoader, "/bold.json");
  const config = useMemo(
    () => ({
      font,
      size: fontSize,
      height: 30,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 6,
      bevelSize: 2.5,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    [font, fontSize]
  );
  const mesh = useRef();
  useLayoutEffect(() => {
    const size = new THREE.Vector3();
    mesh.current.geometry.computeBoundingBox();
    mesh.current.geometry.boundingBox.getSize(size);
    mesh.current.position.x =
      hAlign === "center" ? -size.x / 2 : hAlign === "right" ? 0 : -size.x;
    mesh.current.position.y =
      vAlign === "center" ? -size.y / 2 : vAlign === "top" ? 0 : -size.y;
  }, [children]);
  return (
    <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={mesh}>
        <textGeometry args={[children, config]} />
        <meshNormalMaterial />
      </mesh>
    </group>
  );
}
