import React, {useContext } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../context/UserContext";


const Card = ({ array, socket }) => {
  const { user } = useContext(UserContext);
  const history = useHistory();

  const handleClick = async (id) => {
    if (socket) {
      socket.emit("sendNotification", {
        senderName: user.username,
        senderId: user.id,
        receiverName: id,
        type: "profile view",
      });
      history.push(`/users/${id}`);
    }
  };
  return (
    <div className="card border-light mb-3">
      <div className="search-card">
        {array &&
          array.map((array) => (
            <div
              key={uuidv4()}
              className="card bg-light mb-3"
              style={{ maxWidth: "10rem" }}
            >
              <div className="card-header">
                {array.username}, {array.birthdate}
              </div>
              <img
                alt="card-img"
                className="search-img"
                src={array.profile_pic}
                onClick={() => handleClick(array.id)}
              ></img>
              <div className="card-body text-warning">
                <p className="card-title">
                  ~{Math.round(array.distance / 1000)} km away
                </p>
                <p className="card-title">
                  {array.city}, {array.country}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Card;
