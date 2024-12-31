import React, { useMemo } from "react";
import { AdditiveBlending } from "three";

const Sky = ({ pointCount, texture, size }) => {
  const [positions] = useMemo(() => {
    let positions = [];
    for (let i = 0; i < pointCount; i++) {
      positions.push((Math.random() - 0.5) * 500);
      positions.push((Math.random() - 0.5) * 300);
      positions.push((Math.random() - 0.5) * 500);
    }
    return [new Float32Array(positions)];
  }, [pointCount]);

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={size}
        blending={AdditiveBlending}
        depthWrite={false}
        alphaMap={texture}
        alpha={true}
      />
    </points>
  );
};

export default Sky;
