import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import StarRating from "../models/StarRating";
import useGetDistance from "../utils/useGetDistance";
import { format } from "timeago.js";
import { UserContext } from "../context/UserContext";

const Dashboard = ({ socket }) => {
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState([]);
  const xsrfToken = getCookie("refreshToken");
  const history = useHistory();
  const distance = useGetDistance();

  useEffect(() => {
    const getLoggedIn = async () => {
      const response = await axios.get(
        `http://localhost:5000/user/${xsrfToken}`,
        {}
      );
      setUser(response.data);
    };
    getLoggedIn();
  }, [xsrfToken, setUser]);

  const handleUserSelect = async (id) => {
    socket.emit("sendNotification", {
      senderName: user.username,
      senderId: user.id,
      receiverName: id,
      type: "profile view",
    });
    history.push(`/users/${id}`);
  };

  const handleReport = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/report/${user.id}/${id}`
      );
      setMessage(response.data.msg);
    } catch (error) {
      if (error.response) console.log("error", error.response.data);
    }
  };
  if (!xsrfToken) {
    history.push("/");
  }
  if (distance) {
    distance.sort((a, b) => a.distance - b.distance);
  }

  if (distance.length === 0)
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="">
      <p className="error">{message}</p>
      <br />
      {/* <div className="text-center">
        <h3 className="toggle" onClick={() => setShow(!show)}>
          Filter ▼
        </h3>
        {show ? <Search /> : null}
      </div> */}
      <div className="dashboard">
        {distance &&
          // eslint-disable-next-line
          distance.map((user) => {
            if (user.profile_pic) {
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
                        <h6 className="card-title">
                          {user.city}, {user.country}{" "}
                        </h6>
                        <StarRating rating={user.fame} /> <br />
                        <p className="card-text">
                          About {Math.round(user.distance / 1000)} km away
                        </p>
                        <div>
                          <a
                            onClick={() => handleReport(user.id)}
                            className="report"
                            href="http://localhost:3000/dashboard"
                          >
                            Report fake account
                          </a>
                          <p className="report">
                            Last seen {format(user.updated_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default Dashboard;
