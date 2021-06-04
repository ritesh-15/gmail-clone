import React from "react";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";

function App() {
  return (
    <Router>
      <Switch>
        <div className="app">
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
