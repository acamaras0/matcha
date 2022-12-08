import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Redirect } from "react-router-dom";
import "react-edit-text/dist/index.css";
import PicturesForm from "./PicturesForm";
import { getCookie } from "react-use-cookie";
import Overview from "../models/Overview";
import ProfilePic from "./ProfilePic";
import EditPictures from "../models/EditPictures";
import ChangePassword from "../models/ChangePassword";
import UpdateProfile from "../models/UpdateProfile";

const Profile = () => {
	const { id } = useParams();
	const [user, setUser] = useState("");
	const [pics, setPics] = useState([]);
	const xsrfToken = getCookie("refreshToken");
	const [show, setShow] = useState(false);
	const [show1, setShow1] = useState(false);
	const [show2, setShow2] = useState(false);
	const [show3, setShow3] = useState(false);
	const [showUpdate, setShowUpdate] = useState(false);
	const [message, setMessage] = useState("");
	const [message2, setMessage2] = useState("");

	if (message) {
		setTimeout(() => {
			setMessage("");
			setMessage2("");
		}, 2000);
	}

	useEffect(() => {
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
		const getPicPath = async () => {
			const response = await axios.get(
				`http://localhost:5000/user/pictures/${id}`,
				{}
			);
			setPics(response.data);
		};
		getPicPath();
		return () => {
			setPics({});
		};
	}, [id, xsrfToken]);

	if (xsrfToken === "") {
		return <Redirect to="/" />;
	}
	if (user)
		return (
			<div className="text-center">
				<div className="update">
					<div className="btn-group btn-group-toggle">
						<button
							className="btn btn-warning"
							onClick={() => setShow3(!show3)}
						>
							Edit Photos
						</button>
						<button
							className="btn btn-warning"
							onClick={() => setShow1(!show1)}
						>
							Upload pictures
						</button>
						<button
							className="btn btn-warning"
							onClick={() => setShow2(!show2)}
						>
							Change profile picture
						</button>
						<button
							className="btn btn-warning"
							onClick={() => setShow(!show)}
						>
							Change Password
						</button>
						<button
							className="btn btn-warning"
							onClick={() => setShowUpdate(!showUpdate)}
						>
							Update profile
						</button>
					</div>
					<div>
						{show1 ? <PicturesForm /> : null}
						{show2 ? <ProfilePic /> : null}
						{show3 ? (
							<EditPictures pics={pics} user={user} />
						) : null}
					</div>
					<div className="card-password">
						{show ? (
							<ChangePassword
								id={id}
								setMessage={setMessage}
								setMessage2={setMessage2}
							/>
						) : null}
						<p className="error">{message2}</p>
						<div>
							{showUpdate ? (
								<UpdateProfile
									user={user}
									id={id}
									message={message}
									setMessage={setMessage}
								/>
							) : null}
						</div>
					</div>
					<div className="view">
						{pics ? (
							<div className="card" style={{ width: "50rem" }}>
								<Overview pics={pics} user={user} />
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
	return <div>Loading...</div>;
};

export default Profile;
