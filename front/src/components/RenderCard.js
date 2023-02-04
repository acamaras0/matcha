import React from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { countUpViews } from "../service/user";

const Card = ({ array, socket, user }) => {
  const history = useHistory();
  const handleClick = async (id) => {
    if (socket) {
      socket.emit("sendNotification", {
        senderName: user.username,
        senderId: user.id,
        receiverName: id,
        type: "profile view",
      });
    }
    history.push(`/users/${id}`);
    await countUpViews(id);
  };
  return (
    <div className="card border-light mb-3">
      <div className="search-card">
        {array &&
          array.map((array) => (
            <div
              key={uuidv4()}
              className="card bg-light mb-3"
              style={{ maxWidth: "20rem" }}
            >
              <div
                className="card-header"
                onClick={() => handleClick(array.id)}
              >
                {array.username}, {array.birthdate}
              </div>
              <img
                className="search-img"
                src={array.profile_pic}
                onClick={() => handleClick(array.id)}
                alt="img-card"
              ></img>
              <div className="card-body text-dark">
                <p className="card-title">
                  ~{Math.round(array.distance / 1000)} km away
                </p>
                <div className="card-title">
                  <>
                    {array.online === 1 ? (
                      <p className="online"></p>
                    ) : (
                      <p className="offline"></p>
                    )}
                  </>
                  {array.city}, {array.country}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Card;
