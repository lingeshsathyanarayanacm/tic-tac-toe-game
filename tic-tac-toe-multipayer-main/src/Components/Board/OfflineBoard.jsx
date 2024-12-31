import React, { useState } from "react";
import {
  BoardCover,
  Game,
  Row,
  Reset,
  Container,
  BoardContainer,
} from "../../styles";
import { useHistory } from "react-router-dom";
import findBestMove from "../../helpers/ai.js";

const OfflineBoard = () => {
  const history = useHistory();
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [gameDone, setGameDone] = useState(false);
  const [message, setMessage] = useState(null);
  const [turnCount, setTurnCount] = useState(0);
  const [playerTurn, setPlayerTurn] = useState("X");

  const checkBoard = (newBoard) => {
    if (
      (newBoard[0] === newBoard[1] &&
        newBoard[1] === newBoard[2] &&
        newBoard[2] === playerTurn) ||
      (newBoard[3] === newBoard[4] &&
        newBoard[4] === newBoard[5] &&
        newBoard[5] === playerTurn) ||
      (newBoard[6] === newBoard[7] &&
        newBoard[7] === newBoard[8] &&
        newBoard[8] === playerTurn) ||
      (newBoard[0] === newBoard[4] &&
        newBoard[4] === newBoard[8] &&
        newBoard[8] === playerTurn) ||
      (newBoard[6] === newBoard[4] &&
        newBoard[4] === newBoard[2] &&
        newBoard[2] === playerTurn) ||
      (newBoard[0] === newBoard[3] &&
        newBoard[3] === newBoard[6] &&
        newBoard[6] === playerTurn) ||
      (newBoard[1] === newBoard[4] &&
        newBoard[4] === newBoard[7] &&
        newBoard[7] === playerTurn) ||
      (newBoard[2] === newBoard[5] &&
        newBoard[5] === newBoard[8] &&
        newBoard[8] === playerTurn)
    ) {
      setMessage(playerTurn === "X" ? "Player Wins!!" : "AI Wins");
      setGameDone(true);
    }
    if (turnCount === 8) {
      setMessage("Draw");
      setGameDone(true);
    }
  };
  const setSquare = (index) => {
    if (!board[index] && !gameDone) {
      const newBoard = [...board];
      newBoard[index] = "X";
      setPlayerTurn("X");
      if (turnCount >= 4) {
        checkBoard(newBoard);
      }
      const move = findBestMove([
        newBoard.slice(0, 3),
        newBoard.slice(3, 6),
        newBoard.slice(6, 9),
      ]);
      newBoard[move.row * 3 + move.col] = "O";
      setPlayerTurn("O");

      if (turnCount >= 4) {
        checkBoard(newBoard);
      }
      setTurnCount(turnCount + 2);

      setBoard(newBoard);
    }
  };

  const handleReset = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setGameDone(false);
    setMessage(null);
    setPlayerTurn("X");
    setTurnCount(null);
  };
  const handleExit = () => {
    history.push("/");
  };
  return (
    <BoardContainer>
      <BoardCover>
        <h1>Tic-Tac-Toe Room </h1>
        <h3>{message ? message : `Player Vs AI`}</h3>
        <Game small={window.innerWidth < 767}>
          <Row>
            <Container onClick={() => setSquare(0)}>{board[0]}</Container>
            <Container onClick={() => setSquare(1)}>{board[1]}</Container>
            <Container onClick={() => setSquare(2)}>{board[2]}</Container>
          </Row>
          <Row>
            <Container onClick={() => setSquare(3)}>{board[3]}</Container>
            <Container onClick={() => setSquare(4)}>{board[4]}</Container>
            <Container onClick={() => setSquare(5)}>{board[5]}</Container>
          </Row>
          <Row>
            <Container onClick={() => setSquare(6)}>{board[6]}</Container>
            <Container onClick={() => setSquare(7)}>{board[7]}</Container>
            <Container onClick={() => setSquare(8)}>{board[8]}</Container>
          </Row>
        </Game>
        {gameDone && <Reset onClick={() => handleReset()}>Reset</Reset>}
        <Reset onClick={() => handleExit()}>Exit</Reset>
      </BoardCover>
    </BoardContainer>
  );
};

export default OfflineBoard;
