import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import StarRating from "../models/StarRating";
import useGetDistance from "../utils/useGetDistance";
import { format } from "timeago.js";
import { UserContext } from "../context/UserContext";
import { getCookie } from "react-use-cookie";

const Dashboard = ({ socket }) => {
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState([]);
  const history = useHistory();
  const distance = useGetDistance();
  const xsrfToken = getCookie("refreshToken");

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
  }, [setUser, xsrfToken]);

  const handleUserSelect = async (id) => {
    socket.emit("sendNotification", {
      senderName: user.username,
      senderId: user.id,
      receiverName: id,
      type: "profile view",
    });
    history.push(`/users/${id}`);

    await axios.post(`http://localhost:5000/user/views/${id}`);
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
  if (xsrfToken === "") {
    return <Redirect to="/" />;
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
        <p className="text-center">🔺 🔻 </p>
      <div className="radio">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value="option1"
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            Location
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value="option2"
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            Popularity
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio3"
            value="option3"
          />
          <label className="form-check-label" htmlFor="inlineRadio3">
            Age{" "}
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio4"
            value="option4"
          />
          <label className="form-check-label" htmlFor="inlineRadio4">
            Common tags{" "}
          </label>
        </div>
      </div>
      <div className="dashboard">
        {distance &&
          distance.map((user) => {
            // if (user.profile_pic) {
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
            // }
          })}
      </div>
    </div>
  );
};

export default Dashboard;
