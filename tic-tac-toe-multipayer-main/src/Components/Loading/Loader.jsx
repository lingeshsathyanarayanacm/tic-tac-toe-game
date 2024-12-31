import React from "react";
import { LoadContainer, LoadHead, HomeButton } from "../../styles";
import LoopObject from "./LoopObject";

const Loader = ({ text, handleExit, id, isPrivate, back, closeNotFound }) => {
  return (
    <LoadContainer>
      <LoadHead>{text}</LoadHead>
      {isPrivate && <LoadHead>{id}</LoadHead>}

      <LoopObject />
      {handleExit && (
        <HomeButton onClick={() => handleExit(id)}>Exit</HomeButton>
      )}
      {back && <HomeButton onClick={() => closeNotFound()}>Back</HomeButton>}
    </LoadContainer>
  );
};

export default Loader;
