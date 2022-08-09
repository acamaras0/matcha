import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import ProfileForm from "./components/ProfileForm";
import ForgotPasswords from "./components/ForgotPassword"

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
          <ForgotPasswords />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/completeprofile">
          <Navbar/>
          <ProfileForm />
        </Route>
        <Route path="/dashboard">
          <Navbar />
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
