import React from "react";
import { useHistory } from "react-router-dom";
import { format } from "timeago.js";
import StarRating from "./StarRating";
import { countUpViews } from "../service/user";

const Recommended = ({ filtered, socket, user }) => {
  const history = useHistory();

  const handleUserSelect = async (id) => {
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
    <div className="dashboard">
      {filtered &&
        filtered
          .filter((person) => person.distance / 1000 < 500)
          .map((user) => {
            if (user.profile_pic && user.profile_pic.length > 0) {
              return (
                <div
                  key={user.id}
                  className="card mb-4"
                  style={{ width: "20rem" }}
                >
                  <div className="row no-gutters">
                    <div>
                      <img
                        onClick={() => handleUserSelect(user.id)}
                        className="card-img img-fluid"
                        src={user.profile_pic}
                        alt="Card cap"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          {user.username}, {user.birthdate}{" "}
                          {user.online === 1 ? (
                            <p className="online"></p>
                          ) : (
                            <p className="offline"></p>
                          )}
                        </h5>
                        <p className="card-title">
                          {user.city}, {user.country}{" "}
                        </p>
                        <StarRating rating={user.fame} /> <br />
                        <p className="text-dark">
                          About {Math.round(user.distance / 1000)} km away
                        </p>
                        <p className="interests">{user.interests}</p>
                        <div>
                          <p style={{ color: "grey", fontSize: "10px" }}>
                            Last seen {format(user.updated_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return <p> Upload your picture to get started!</p>;
            }
          })}
    </div>
  );
};

export default Recommended;
