import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import ProfileForm from "./components/ProfileForm";
import PicturesForm from "./components/PicturesForm";
import ForgotPasswords from "./components/ForgotPassword";

function App() {
  return (
    <UserContextProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/forgotpassword">
          <ForgotPasswords />
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
        {/* {users.birthdate === 0 ? (
          <Redirect to="/completeprofile" />
        ) : (
          <Redirect to="/dashboard" />
        )} */}
      </Switch>
    </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
