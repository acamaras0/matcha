/* eslint-disable */
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { UserContextProvider } from "./context/UserContext";
import Dashboard from "./components/Dashboard";

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

import axios from "axios";
import Login from "./components/Login";
import { io } from "socket.io-client";

function App() {
  const [cookie, setCookie] = useCookies(["refreshToken"]);
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      const gps = await axios.get("https://geolocation-db.com/json/");
      console.log(gps.data.country_name);
    };
    getLocation();
  }, []);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
    if (cookie.refreshToken) {
      const getLoggedIn = async () => {
        const response = await axios.get(
          `http://localhost:5000/user/${cookie.refreshToken}`,
          {}
        );
        setUser(response.data);
      };
      getLoggedIn();
    }
  }, []);

  useEffect(() => {
    if (user) {
      socket.emit("addOnlineUser", user);
      // socket.on("getUsers", (users) => {
      //   console.log("Users", users);
      // });
    }
  }, [user.username]);

  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<Login />}/>
            <Route exact path="/forgotpassword" element={<ForgotPasswords />}/>
            <Route exact path="/resetpassword/:token" element={<ResetPassword />}/>
            <Route exact path="/register" element={<Register />}/>
            <Route exact path="/activate/:hash" element={<Activation />}/>
            <Route exact path="/completeprofile" element={ <ProfileForm />}/>
            <Route exact path="/pictures" element={ <PicturesForm />}/>
            <Route exact path="/dashboard" element={ <Dashboard socket={socket}/>}/>
            <Route exact path="/profile/:id" element={ <Profile />}/>
            <Route exact path="/user/:id" element={ <ProfileRandom socket={socket} />}/>
            <Route exact path="/chat/:id" element={ <Chat socket={socket} />}/>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
