import React from "react";
import LoginComponent from "../Components/Login/index";
import { auth, db, provider } from "../firebase";
import { useStateValue } from "../StateProvider";

const Login = () => {
  const [, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(async (result) => {
        dispatch({
          type: "SET_USER",
          user: {
            name: result.user.displayName,
            email: result.user.email,
            profile: result.user.photoURL,
            id: result.user.uid,
          },
        });
        const users = await db
          .collection("users")
          .get()
          .then((data) =>
            data.docs.filter((doc) => doc.data().id === result.user.uid)
          );
        if (!users.length > 0)
          await db
            .collection("users")
            .doc(result.uid)
            .set(
              Object.assign(
                {},
                {
                  name: result.displayName || null,
                  email: result.email || null,
                  profile: result.photoURL || null,
                  id: result.uid || null,
                }
              )
            );
      })
      .catch((error) => alert(error.message));
  };
  return <LoginComponent signIn={signIn} />;
};

export default Login;
