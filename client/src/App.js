import React from "react";
// import { useEffect, useState} from "react";
// import Axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ProfileForm from "./pages/ProfileForm";
import ProfilePage from "./pages/ProfilePage";
import ForgotPassword from "./pages/ForgotPassword";


function App() {

  // const [loginStatus, setLoginStatus] = useState("");
  //   useEffect(() => {
  //   Axios.get("http://localhost:3001/login").then((response) => {
  //     if (response.data.loggedIn === true) {
  //       setLoginStatus(response.data.user[0].username);
  //     }
  //   });
  // }, []);

  return (
    <Router>
      <Route path="/registration" exact render={(props) => <Registration />} />
      <Route path="/login" exact render={(props) => <Login />} />
      <Route path="/forgotpassword" exact render={(props) => <ForgotPassword />} />
      <Route path="/completeprofile" exact render={(props) => <ProfileForm/>}/>
      <Route path="/profile" exact render={(props) => <ProfilePage />} />
      <Route path="/" exact render={(props) => <Registration />} />
    </Router>
  );
}

export default App;
