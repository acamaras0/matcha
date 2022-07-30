import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Route path="/registration" exact render={(props) => <Registration />} />
      <Route path="/login" exact render={(props) => <Login />} />
      <Route path="/" exact render={(props) => <Registration />} />
    </Router>
  );
}

export default App;
