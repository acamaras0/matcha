import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ProfileForm from "./pages/ProfileForm";

function App() {
  return (
    <Router>
      <Route path="/registration" exact render={(props) => <Registration />} />
      <Route path="/login" exact render={(props) => <Login />} />
      <Route path="/completeprofile" exact render={(props) => <ProfileForm/>}/>
      <Route path="/" exact render={(props) => <Registration />} />
    </Router>
  );
}

export default App;
