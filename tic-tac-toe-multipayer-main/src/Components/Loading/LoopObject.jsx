import { animated, useSpring } from "react-spring";
const LoopObject = () => {
  const styles = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 180 },
  });

  return (
    <animated.div
      style={{
        width: 80,
        height: 80,
        marginTop: "50px",
        marginBottom: "50px",
        backgroundColor: "#46e891",
        borderRadius: 16,
        ...styles,
      }}
    />
  );
};

export default LoopObject;
