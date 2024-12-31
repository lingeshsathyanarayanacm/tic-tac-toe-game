import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { lazy, Suspense, useEffect } from "react";
import { auth, db } from "./firebase";
import { useStateValue } from "./StateProvider";
import Loader from "./Components/Loading/Loader";
const Home = lazy(() => import("./Pages/Home"));
const Room = lazy(() => import("./Pages/Room"));
const AiMatch = lazy(() => import("./Pages/AiMatch"));
const Login = lazy(() => import("./Pages/Login"));

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(async (result) => {
      if (result) {
        dispatch({
          type: "SET_USER",
          user: {
            name: result.displayName,
            email: result.email,
            profile: result.photoURL,
            id: result.uid,
          },
        });
        const users = await db
          .collection("users")
          .get()
          .then((data) => data.docs.filter((doc) => doc.id === result.uid));
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
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);
  return (
    <div className="App">
      {!user ? (
        <Suspense fallback={<Loader text="Redirecting To Login..." />}>
          <Login />
        </Suspense>
      ) : (
        <Router>
          <Switch>
            <Suspense fallback={<Loader text="Loading..." />}>
              <Route path="/ai" component={AiMatch} />
              <Route path="/room/:id" component={Room} />
              <Route exact path="/" component={Home} />
            </Suspense>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
