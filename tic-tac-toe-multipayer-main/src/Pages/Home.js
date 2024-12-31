import React, { useState } from "react";
import { useHistory } from "react-router";
import { auth, db } from "../firebase";
import { useStateValue } from "../StateProvider";
import Modal from "@material-ui/core/Modal";
import {
  HomeContainer,
  HomeButtons,
  Cover,
  HomeBox,
  Input,
  HomeButton,
} from "../styles";
import TextScroller from "../Components/Home/TextScroller.jsx";
import Loader from "../Components/Loading/Loader";

const Home = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let room = null;
  const findRoom = async () => {
    setLoading(true);
    const rooms = await db
      .collection("rooms")
      .get()
      .then((data) =>
        data.docs.filter(
          (doc) => doc.data().players.length < 2 && !doc.data().isPrivate
        )
      );

    if (rooms.length > 0) {
      room = rooms[Math.floor(rooms.length * Math.random())];
      await db
        .collection("rooms")
        .doc(room.id)
        .update({ players: [...room.data().players, user.id] })
        .then(() => {
          history.push(`/room/${room.id}`);
          setLoading(false);
        });
    } else {
      await db
        .collection("rooms")
        .add({
          board: ["", "", "", "", "", "", "", "", ""],
          message: null,
          gameDone: false,
          playerTurn: "X",
          turnCount: 0,
          players: [user.id],
          isPrivate: false,
        })
        .then((doc) => {
          history.push(`/room/${doc.id}`);
          setLoading(false);
        });
    }
  };

  const logoutHandler = () => {
    if (user) {
      auth.signOut();
      dispatch({
        type: "REMOVE_USER",
      });
    }
  };

  const createPrivateRoom = async () => {
    await db
      .collection("rooms")
      .add({
        board: ["", "", "", "", "", "", "", "", ""],
        message: null,
        gameDone: false,
        playerTurn: "X",
        turnCount: 0,
        players: [user.id],
        isPrivate: true,
      })
      .then((doc) => {
        history.push(`/room/${doc.id}`);
        setLoading(false);
      });
  };

  const findPrivateRoom = async (e) => {
    e.preventDefault();
    handleOpen();
    setLoading(true);
    const room = await db.collection("rooms").doc(input).get();
    if (!room.exists) setWrong(true);
    else
      await db
        .collection("rooms")
        .doc(input)
        .update({ players: [...room.data().players, user.id] })
        .then(() => {
          history.push(`/room/${input}`);
        });
    setLoading(false);
  };

  const body = (
    <form
      style={{
        width: "max-content",
        margin: "auto",
        border: "none",
        outline: "none",
        padding: "20px",
        borderRadius: "15px",
        marginTop: "40vh",
        background:
          "radial-gradient(circle farthest-corner at center top,#071021,#19324a)",
      }}
      onSubmit={(e) => findPrivateRoom(e)}
    >
      <Input
        type="text"
        placeholder="Enter Room ID:"
        onChange={(e) => setInput(e.target.value)}
      />
      <button style={{ display: "none" }}>Search</button>
    </form>
  );
  const closeNotFound = () => {
    setWrong(false);
    handleClose();
  };
  if (loading) return <Loader text="Looking For A Room..." />;
  if (wrong)
    return (
      <Loader
        text="Room Does Not Exist..."
        back={true}
        closeNotFound={closeNotFound}
      />
    );

  return (
    <HomeContainer>
      <HomeBox>
        <TextScroller text="Tic-Tac-Toe" />
        <HomeButtons>
          <HomeButton onClick={findRoom}>Play Game</HomeButton>
          <HomeButton onClick={() => history.push("/ai")}>
            Play with AI
          </HomeButton>

          <HomeButton onClick={createPrivateRoom}>
            Create Private Room
          </HomeButton>
          <HomeButton onClick={handleOpen}>Find Private Room</HomeButton>
          <HomeButton onClick={logoutHandler}>Log Out</HomeButton>
        </HomeButtons>
        <Modal open={open} onClose={handleClose}>
          {body}
        </Modal>
      </HomeBox>
      <Cover />
    </HomeContainer>
  );
};

export default Home;
