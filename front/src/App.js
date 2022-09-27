import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import ProfileForm from "./components/ProfileForm";
import PicturesForm from "./components/PicturesForm";
import ForgotPasswords from "./components/ForgotPassword";
import Profile from "./components/Profile";
import ProfileRandom from "./components/ProfileRandom";
import Footer from "./models/Footer";
import ResetPassword from "./components/ResetPassword";
import Activation from "./components/Activation";
import Chat from "./components/Chat";
import Search from "./components/Search";
import { getCookie } from "react-use-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

function App() {
  const xsrfToken = getCookie("refreshToken");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
    if (xsrfToken !== "") {
      const getLoggedIn = async () => {
        const response = await axios.get(
          `http://localhost:5000/user/${xsrfToken}`,
          {}
        );
        setUser(response.data);
      };
      getLoggedIn();
    }
  }, [xsrfToken]);

  useEffect(() => {
    if (user) {
      socket.emit("addOnlineUser", user);
      // socket.on("getUsers", (users) => {
      //   console.log("Users", users);
      // });
    }
  }, [socket, user]);

  return (
    <>
      <div className="App">
        <UserContextProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <Login />
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
                <Navbar socket={socket} />
                <ProfileForm />
              </Route>
              <Route path="/pictures">
                <Navbar socket={socket} />
                <PicturesForm />
              </Route>
              <Route path="/dashboard">
                <Navbar socket={socket} />
                <Dashboard socket={socket} />
              </Route>
              <Route path="/profile/:id">
                <Navbar socket={socket} />
                <Profile />
              </Route>
              <Route path="/users/:id">
                <Navbar socket={socket} />
                <ProfileRandom socket={socket} />
              </Route>
              <Route path="/chat/:id">
                <Navbar socket={socket} />
                <Chat socket={socket} />
              </Route>
              <Route path="/filter/:id">
                <Navbar socket={socket} />
                <Search socket={socket} />
              </Route>
            </Switch>
            <Footer />
          </BrowserRouter>
        </UserContextProvider>
      </div>
    </>
  );
}

export default App;
