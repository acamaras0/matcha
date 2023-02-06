import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NavBar from "./components/Navbar";
import Register from "./pages/Register";
import CompleteProfile from "./pages/CompleteProfile";
import ForgotPasswords from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import ProfileMatch from "./pages/ProfileMatch";
import Footer from "./components/Footer";
import ResetPassword from "./pages/ResetPassword";
import Activation from "./pages/Activation";
import Chat from "./pages/Chat";
import Search from "./pages/Search";
import UploadPic from "./pages/SetInitialProfilePicture";
import { getCookie } from "react-use-cookie";
import { useEffect, useState } from "react";
import { getLoggedIn } from "./service/auth";
import { io } from "socket.io-client";

function App() {
  const cookie = getCookie("refreshToken");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
    if (cookie !== "") {
      const getUser = async () => {
        const response = await getLoggedIn(cookie);
        setUser(response);
        setLoggedIn(true)
      };
      getUser();
    }
  }, [cookie, setUser]);

  useEffect(() => {
    if (user) {
      socket.emit("addOnlineUser", user);
    }
  }, [socket, user]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <>
      <div className="App">
        <div className="App-content">
          <BrowserRouter>
            <NavBar
              socket={socket}
              user={user}
              handleLogout={handleLogout}
              loggedIn={loggedIn}
            />
            <Switch>
              <Route exact path="/">
                <Login handleLogin={handleLogin} />
              </Route>
              <Route path="/forgotpassword">
                <ForgotPasswords />
              </Route>
              <Route path="/resetpassword/:token">
                <ResetPassword />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/activate/:hash">
                <Activation />
              </Route>
              <Route path="/completeprofile">
                <CompleteProfile />
              </Route>
              <Route path="/pictures">
                <UploadPic />
              </Route>
              <Route path="/dashboard">
                <Dashboard socket={socket} />
              </Route>
              <Route path="/profile/:id">
                <Profile />
              </Route>
              <Route path="/users/:id">
                <ProfileMatch socket={socket} />
              </Route>
              <Route path="/chat/:id">
                <Chat socket={socket} />
              </Route>
              <Route path="/filter/:id">
                <Search socket={socket} />
              </Route>
            </Switch>
            <Footer />
          </BrowserRouter>
        </div>
      </div>
    </>
  );
}

export default App;
