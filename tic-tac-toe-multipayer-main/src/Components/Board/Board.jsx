import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { db } from "../../firebase";
import useRoom from "../../hooks/useRoom";
import {
  BoardCover,
  Game,
  Row,
  Reset,
  Container,
  BoardContainer,
} from "../../styles";
import { useStateValue } from "../../StateProvider";
import Loader from "../Loading/Loader";

const Board = () => {
  const { id } = useParams();
  const { processing, room } = useRoom(id);
  const [{ user }] = useStateValue();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [opponent, setOpponent] = useState(false);

  if (processing) return <Loader text="Loading Room..." />;
  if (!room) return <Loader text="Room Not Found..." />;
  if (loading) return <Loader text="Resetting The Game..." />;

  const {
    board,
    gameDone,
    message,
    turnCount,
    playerTurn,
    players,
    isPrivate,
  } = room;

  const getOpponent = async () => {
    return await db
      .collection("users")
      .doc(players.filter((player) => player !== user.id)[0])
      .get()
      .then((result) => setOpponent(result.data()));
  };

  const sendBoard = async (id, newRoom) => {
    await db.collection("rooms").doc(id).set(newRoom);
  };
  const setSquare = (index) => {
    const newBoard = [...board];
    newBoard[index] = playerTurn;
    let newTurnCount,
      newGameDone = false,
      newMessage = null,
      newPlayerTurn = playerTurn === "X" ? "O" : "X";
    if (!board[index] && !gameDone) {
      if (turnCount >= 4) {
        if (playerTurn === "X") {
          if (
            (newBoard[0] === "X" &&
              newBoard[1] === "X" &&
              newBoard[2] === "X") ||
            (newBoard[3] === "X" &&
              newBoard[4] === "X" &&
              newBoard[5] === "X") ||
            (newBoard[6] === "X" &&
              newBoard[7] === "X" &&
              newBoard[8] === "X") ||
            (newBoard[0] === "X" &&
              newBoard[4] === "X" &&
              newBoard[8] === "X") ||
            (newBoard[6] === "X" &&
              newBoard[4] === "X" &&
              newBoard[2] === "X") ||
            (newBoard[0] === newBoard[3] &&
              newBoard[3] === newBoard[6] &&
              newBoard[6] === "X") ||
            (newBoard[1] === newBoard[4] &&
              newBoard[4] === newBoard[7] &&
              newBoard[7] === "X") ||
            (newBoard[2] === newBoard[5] &&
              newBoard[5] === newBoard[8] &&
              newBoard[8] === "X")
          ) {
            newMessage = "X Wins!!";
            newGameDone = true;
          }
        } else {
          if (
            (newBoard[0] === "O" &&
              newBoard[1] === "O" &&
              newBoard[2] === "O") ||
            (newBoard[3] === "O" &&
              newBoard[4] === "O" &&
              newBoard[5] === "O") ||
            (newBoard[6] === "O" &&
              newBoard[7] === "O" &&
              newBoard[8] === "O") ||
            (newBoard[0] === "O" &&
              newBoard[4] === "O" &&
              newBoard[8] === "O") ||
            (newBoard[6] === "O" &&
              newBoard[4] === "O" &&
              newBoard[2] === "O") ||
            (newBoard[0] === newBoard[3] &&
              newBoard[3] === newBoard[6] &&
              newBoard[6] === "O") ||
            (newBoard[1] === newBoard[4] &&
              newBoard[4] === newBoard[7] &&
              newBoard[7] === "O") ||
            (newBoard[2] === newBoard[5] &&
              newBoard[5] === newBoard[8] &&
              newBoard[8] === "O")
          ) {
            newMessage = "O Wins !!";
            newGameDone = true;
          }
        }
        if (turnCount === 8) {
          newMessage = "Draw";
          newGameDone = true;
        }
      }
      newTurnCount = turnCount + 1;
      const newRoom = {
        board: newBoard,
        message: newMessage,
        turnCount: newTurnCount,
        gameDone: newGameDone,
        playerTurn: newPlayerTurn,
        players: players,
      };
      sendBoard(id, newRoom);
    }
  };
  const handleReset = async (id) => {
    setLoading(true);
    await db
      .collection("rooms")
      .doc(id)
      .set({
        board: ["", "", "", "", "", "", "", "", ""],
        message: null,
        gameDone: false,
        playerTurn: playerTurn === "X" ? "O" : "X",
        turnCount: 0,
        players: players,
      })
      .then(() => setLoading(false));
  };
  const handleExit = async (id) => {
    const newPlayers = players.filter((p) => p !== user.id);
    if (newPlayers.length > 0) {
      await db
        .collection("rooms")
        .doc(id)
        .update({
          players: newPlayers,
        })
        .then(() => {
          history.push("/");
        });
    } else {
      await db
        .collection("rooms")
        .doc(id)
        .delete()
        .then(() => {
          history.push("/");
        });
    }
  };
  getOpponent();
  return (
    <BoardContainer>
      {opponent && window.innerWidth > 767 && (
        <BoardCover>
          <img src={user.profile} alt="" />
          <span style={{ marginTop: "10px" }}>{user.name}</span>
        </BoardCover>
      )}

      <BoardCover>
        {players.length < 2 ? (
          !isPrivate ? (
            <Loader
              text="Waiting For Someone To Join..."
              handleExit={handleExit}
              id={id}
            />
          ) : (
            <Loader
              text="Ask Your Friend To Join Using Given ID..."
              id={id}
              handleExit={handleExit}
              isPrivate={true}
            />
          )
        ) : (
          <>
            <h1>Tic-Tac-Toe Room</h1>
            <h3>{message ? message : `Player Turn - ${playerTurn}`}</h3>
            {(playerTurn === "X" && !(user.id === players[0]) && !gameDone) ||
            (playerTurn === "O" && user.id === players[0] && !gameDone) ? (
              <h1
                style={{
                  position: "absolute",
                  zIndex: 101,
                  marginTop: "-30px",
                  color: "white",
                  backgroundColor: "black",
                  opacity: 0.5,
                  height: "65vh",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Waiting for other player's turn
              </h1>
            ) : (
              ""
            )}
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
          </>
        )}

        {gameDone && <Reset onClick={() => handleReset(id)}>Reset</Reset>}
        {!(players.length < 2) && (
          <Reset onClick={() => handleExit(id)}>Exit</Reset>
        )}
      </BoardCover>
      {opponent && window.innerWidth > 767 && (
        <BoardCover>
          <img src={opponent.profile} alt="" />
          <span style={{ marginTop: "10px" }}>{opponent.name}</span>
        </BoardCover>
      )}
    </BoardContainer>
  );
};

export default Board;
