import React, { useState } from "react";
import StarRating from "./StarRating";
import Gallery from "./Gallery";
import { countTotalViews } from "../service/user";

const Overview = ({ pics, user }) => {
  const [likes, setLikes] = useState("");

  const count = async () => {
    try {
      const response = await countTotalViews(user.id);
      setLikes(response.fame);
    } catch (error) {
      console.log(error);
    }
  };
  count();
  return (
    <div className="overview">
      <div className="text-center">
        <img className="profile-picture" src={user.profile_pic} alt="prof" />
        <h2 className="text-center">
          {user.firstname} {user.lastname}
        </h2>
        <StarRating rating={likes} />
        <p className="text-center">
          {user.city}, {user.country}
        </p>
        <p className="card-text">
          {user.username}, {user.birthdate}
        </p>
        <p className="card-text">
          {user.orientation} {user.gender}
        </p>
        <p className="card-text">"{user.bio}"</p>
            <label>Interested in</label>
            <p className="card-text">{user.interests}</p>
        <div className="card-img">
          {pics.length > 0 ? (
            <Gallery galleryImages={pics} />
          ) : (
            <p className="no-pics">No pictures available.</p>
          )}
        </div>
        <div style={{ margin: "2%" }}>
          <div className="card-body">
            <label>
              {user.username}'s profile has been viewed {user.profile_views}{" "}
              time(s).
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
