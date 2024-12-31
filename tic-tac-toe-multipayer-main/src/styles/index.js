import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  background-color: #46e891;
  cursor: pointer;
  transition: all 0.2s;
  color: white;
  font-size: 40px;
  font-weight: 500;

  :hover {
    transform: scale(1.03);
    background-color: #84fbbc;
    color: gray;
  }
`;

export const BoardCover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  flex: 0.33;
`;
export const BoardCoverSmall = styled(BoardCover)`
  flex-direction: row;
`;
export const BoardContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: space-evenly;
  ${(props) => props.small && "flex-direction:column"}
`;
export const Game = styled.div`
  margin: auto;
  width: 60vh;
  height: 60vh;
  padding: 2px;
  border: 1px solid black;
  ${(props) => props.small && "width:50vh"}
`;

export const Row = styled.div`
  display: flex;
  height: 20vh;
`;

export const HomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: url("ttt.jpg");
  background-repeat: no-repeat;
  background-size: 100vw 100vh;
  flex-direction: column;
`;
export const HomeButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 35vh;
  align-items: center;
`;

export const HomeButton = styled.span`
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  color: #ccc;
  font-weight: 600;
  background-color: #222;
  width: 300px;
  padding: 8px;
  transition: all 0.3s;
  cursor: pointer;
  box-sizing: border-box;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  :hover {
    background-color: #333;
    border: 1px solid #333;
  }
`;
export const Cover = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 10;
  background: rgb(250, 250, 250);
  background: radial-gradient(
    circle,
    rgba(250, 250, 250, 0.4) 0%,
    rgba(28, 28, 28, 0.65) 33%
  );
`;

export const HomeHead = styled.h1`
  font-family: "Raleway";
  font-size: 5.5em;
  font-family: 400;
  margin-bottom: 10px;
  width: 100vw;
  text-align: center;
  color: #ddd;
  background-color: rgb(3, 3, 3, 0.3);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;
export const HomeBox = styled.div`
  z-index: 11;
`;

export const LoadContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: radial-gradient(
    circle farthest-corner at center top,
    #071021,
    #19324a
  );
`;

export const LoadHead = styled.h1`
  color: #fafafa;
`;

export const Reset = styled(HomeButton)`
  margin: auto;
`;

export const Input = styled.input`
  outline: none;
  border: none;
  padding: 10px 5px;
  border-radius: 10px;
`;
