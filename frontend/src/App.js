import React, { useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { setSignIn } from "./features/userSlice";
import {
  selectNetwork,
  setNetwork,
  setUnsetNetwork,
} from "./features/networkSlice";
import Network from "./Components/Network";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setSignIn({
            photoURL: user.photoURL,
            userName: user.displayName,
            userEmail: user.email,
            userId: user.uid,
          })
        );
      }
    });
  }, []);

  const network = useSelector(selectNetwork);

  const ifConnected = window.navigator.onLine;
  if (ifConnected) {
    dispatch(setUnsetNetwork());
  } else {
    dispatch(setNetwork());
  }

  return (
    <div className="app">
      {network && <Network />}
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route path="/mail/:id">
            <Header />
            <Home hide desc />
          </Route>
          <Route path="/send">
            <Header />
            <Home hide send />
          </Route>
          <Route path="/star">
            <Header />
            <Home hide starHead star />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
