import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
// import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import axios from "axios";
//import socketIOClient from "socket.io-client";
//import jwt_decode from "jwt-decode";
// const ENDPOINT = "http://localhost:5000";
// const socket = socketIOClient(ENDPOINT);

function App() {
  return (
    <>
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
            <Route path="/completeprofile">
              <Navbar />
              <ProfileForm />
            </Route>
            <Route path="/pictures">
              <Navbar />
              <PicturesForm />
            </Route>
            <Route path="/dashboard">
              <Navbar />
              <Dashboard />
            </Route>
            <Route path="/profile/:id">
              <Navbar />
              <Profile />
            </Route>
            <Route path="/users/:id">
              <Navbar />
              <ProfileRandom />
            </Route>
            {/* <Route path="/">
              {loggedIn.birthdate !== 0 ? (
                <Redirect to="/profile" />
              ) : (
                <Redirect to="/completeprofile" />
              )}
            </Route> */}
          </Switch>
          <Footer />
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;

// if (!loggedIn)
// return (
//   <UserContextProvider>
//     <BrowserRouter>
//       <Switch>
//         <Route exact path="/">
//           <Login />
//         </Route>
//         <Route path="/forgotpassword">
//           <ForgotPasswords />
//         </Route>
//         <Route path="/register">
//           <Register />
//         </Route>
//       </Switch>
//     </BrowserRouter>
//   </UserContextProvider>
// );
// return (
// <>
//   <UserContextProvider>
//     <BrowserRouter>
//       <Switch>
//         <Route path="/completeprofile">
//           <Navbar />
//           <ProfileForm />
//         </Route>
//         <Route path="/pictures">
//           <Navbar />
//           <PicturesForm />
//         </Route>
//         <Route path="/dashboard">
//           <Navbar />
//           <Dashboard />
//         </Route>
//         <Route path="/profile">
//           <Navbar />
//           <Profile />
//         </Route>
//         <Route path="/">
//           {loggedIn.birthdate !== 0 ? (
//             <Redirect to="/profile" />
//           ) : (
//             <Redirect to="/completeprofile" />
//           )}
//         </Route>

//       </Switch>
//     </BrowserRouter>
//   </UserContextProvider>
// </>
// );
// }
