import React, { useState } from "react";
import axios from "axios";

const ChangePassword = ({ id, setMessage, setMessage2 }) => {
	const [newPassword, setNewPassword] = useState("");
	const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
	const updatePassword = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				`http://localhost:5000/user/updatePassword/${id}`,
				{
					password: newPassword,
					passwordConfirm: newPasswordConfirm,
				}
			);
			setMessage2(response.data.msg);
		} catch (error) {
			if (error.response) {
				setMessage(error.response.data.msg);
			}
		}
	};

	return (
		<>
			<form>
				<h3 className="mt-3">✍ Change password</h3>
				<label>New Password</label>
				<input
					type="password"
					autoComplete="off"
					className="form-control mt-3"
					placeholder="Password..."
					onChange={(e) => {
						setNewPassword(e.target.value);
					}}
				></input>
				<label>Confirm Password</label>
				<input
					type="password"
					className="form-control mt-3"
					placeholder="Confirm password..."
					autoComplete="off"
					onChange={(e) => {
						setNewPasswordConfirm(e.target.value);
					}}
				></input>
			</form>
			<button onClick={updatePassword} className="btn btn-warning">
				Submit
			</button>
		</>
	);
};
export default ChangePassword;
