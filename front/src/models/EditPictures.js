import React, { useState } from "react";
import axios from "axios";

const EditPictures = ({ pics, user }) => {
	const [message1, setMessage1] = useState();
	const [message, setMessage] = useState();

	const deletePic = async (pic_id) => {
		try {
			const response = await axios.delete(
				`http://localhost:5000/user/picture/${pic_id}`
			);
			setMessage1(response.data.msg);
		} catch (error) {
			if (error.response) {
				setMessage(error.response.data.msg);
			}
		}
	};
	return (
		<div className="card-pictures">
			<h3>✍ Edit Pictures</h3>
			{message1 ? (
				<p className="error">{message1}</p>
			) : (
				<p className="error">{message}</p>
			)}
			{pics.length > 0 ? (
				<div className="uploaded-pics">
					{pics
						? pics.map((pic) => (
								<div className="images" key={pic.id}>
									<img
										className="img-top"
										src={pic.img}
										alt="uploaded-pic"
									/>
									<div className="delete-button">
										<button
											className="btn btn-danger"
											onClick={() => deletePic(pic.id)}
										>
											Delete
										</button>
									</div>
								</div>
						  ))
						: null}
				</div>
			) : (
				<img
					alt="backup"
					className="profile-picture"
					src={user.profile_pic}
				/>
			)}
		</div>
	);
};

export default EditPictures;
