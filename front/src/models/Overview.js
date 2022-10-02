import React, { useState } from "react";
import StarRating from "./StarRating";
import Gallery from "./Gallery";
import axios from "axios";

const Overview = ({ pics, user }) => {
  const [likes, setLikes] = useState("");

  const count = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/user/fame/${user.id}`
      );
      setLikes(response.data.fame);
    } catch (error) {
      console.log(error);
    }
  };
  count();
  return (
    <div>
      <div className="text-center">
        <img className="profile-picture" src={user.profile_pic} alt="prof" />
        <h2 className="text-center">
          {user.firstname} {user.lastname}
        </h2>
        <p className="card-text">{user.username}</p>
        <p className="text-center">
          {user.city}, {user.country}
        </p>
        <StarRating rating={likes} />
        <div className="card-img">
          {pics.length > 0 ? (
            <Gallery galleryImages={pics} />
          ) : (
            <img
              className="profile-picture"
              src={user.profile_pic}
              alt="prof"
            />
          )}
        </div>
        <div style={{ margin: "10%" }}>
          <div className="card">
            <div className="card-body">
              <label>Age</label>
              <p className="card-text">{user.birthdate}</p>
              <label>Bio</label>
              <p className="card-text">{user.bio}</p>
              <label>Gender</label>
              <p className="card-text">{user.gender}</p>
              <label>Sexual Orientation</label>
              <p className="card-text">{user.orientation}</p>
              <label>Interests</label>
              <p className="card-text">{user.interests}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
