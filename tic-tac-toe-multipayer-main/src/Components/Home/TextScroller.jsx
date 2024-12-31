import React from "react";
import { useSpring, animated } from "react-spring";
import { HomeHead } from "../../styles";

const TextScroller = ({ text }) => {
  const styles = useSpring({
    loop: true,
    to: [
      { opacity: 1, color: "#fafafa" },
      { opacity: 0, color: "rgb(14,26,19)" },
    ],
    config: { duration: 1500 },
    from: { opacity: 0, color: "black" },
  });

  return (
    <HomeHead>
      <div>
        <animated.div style={styles}>{text}</animated.div>
      </div>
    </HomeHead>
  );
};

export default TextScroller;
