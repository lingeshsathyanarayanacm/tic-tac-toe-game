import { useEffect, useState } from "react";
import { db } from "../firebase";

const useRoom = (id) => {
  const [processing, setProcessing] = useState(true);
  const [room, setRoom] = useState(null);
  useEffect(() => {
    const unsubscribe = db
      .collection("rooms")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) setRoom(doc?.data());
        else console.log("Not Found");
        setProcessing(false);
      });
    return () => {
      unsubscribe();
    };
  }, [id]);
  return { processing, room };
};

export default useRoom;
