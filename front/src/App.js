import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import NavBar from "./components/Navbar";
import NavBarOffline from "./components/NavBarOffline";
import Register from "./components/Register";
import ProfileForm from "./components/ProfileForm";
import ForgotPasswords from "./components/ForgotPassword";
import Profile from "./components/Profile";
import ProfileRandom from "./components/ProfileRandom";
import Footer from "./models/Footer";
import ResetPassword from "./components/ResetPassword";
import Activation from "./components/Activation";
import Chat from "./components/Chat";
import Search from "./components/Search";
import UploadPic from "./components/UploadPic";
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
		}
	}, [socket, user]);

	return (
		<>
			<div className="App">
				<BrowserRouter>
					<Switch>
						<Route exact path="/">
							<NavBarOffline />
							<Login />
						</Route>
						<Route path="/forgotpassword">
							<NavBarOffline />
							<ForgotPasswords />
						</Route>
						<Route path="/resetpassword/:token">
							<NavBarOffline />
							<ResetPassword />
						</Route>
						<Route path="/register">
							<NavBarOffline />
							<Register />
						</Route>
						<Route path="/activate/:hash">
							<NavBarOffline />
							<Activation />
						</Route>
						<Route path="/completeprofile">
							<NavBar socket={socket} />
							<ProfileForm />
						</Route>
						<Route path="/pictures">
							<NavBar socket={socket} />
							<UploadPic />
						</Route>
						<Route path="/dashboard">
							<NavBar socket={socket} />
							<Dashboard socket={socket} />
						</Route>
						<Route path="/profile/:id">
							<NavBar socket={socket} />
							<Profile />
						</Route>
						<Route path="/users/:id">
							<NavBar socket={socket} />
							<ProfileRandom socket={socket} />
						</Route>
						<Route path="/chat/:id">
							<NavBar socket={socket} />
							<Chat socket={socket} />
						</Route>
						<Route path="/filter/:id">
							<NavBar socket={socket} />
							<Search socket={socket} />
						</Route>
					</Switch>
					<Footer />
				</BrowserRouter>
			</div>
		</>
	);
}

export default App;
