import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import StarRating from "../models/StarRating";
import useGetDistance from "../utils/useGetDistance";
import { format } from "timeago.js";
import { UserContext } from "../context/UserContext";
import { getCookie } from "react-use-cookie";
import Recommended from "../models/Recommended";

const Dashboard = ({ socket }) => {
  const { user, setUser } = useContext(UserContext);
  const [message, setMessage] = useState([]);
  const [sortState, setSortState] = useState("none");
  const [show, setShow] = useState(false);
  const history = useHistory();
  const distance = useGetDistance();
  const xsrfToken = getCookie("refreshToken");
  let filtered = [];
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

  const sortMethods = {
    none: { method: (a, b) => null },
    location: { method: (a, b) => a.distance - b.distance },
    fame: { method: (a, b) => b.fame - a.fame },
    age: { method: (a, b) => a.birthdate - b.birthdate },
  };

  if (distance) {
    distance.sort(sortMethods[sortState].method);
    distance.forEach((u) => {
      let result = u.interests.split(",");
      for (let index = 0; index < result.length; index++) {
        result[index] = result[index].replace(/^\s+|\s+$/gm, "");
      }
      let loggedInterests = [];
      if (user.interests) {
        loggedInterests = user.interests.split(",");
        for (let index = 0; index < loggedInterests.length; index++) {
          loggedInterests[index] = loggedInterests[index].replace(
            /^\s+|\s+$/gm,
            ""
          );
        }
        const multipleExist = loggedInterests.some((value) => {
          return result.includes(value);
        });
        if (multipleExist) {
          filtered.push(u);
        }
      }
      return filtered;
    });
  }

  if (distance.length === 0)
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="dashboard-wrap">
      <p className="error">{message}</p>
      <br />
      <p className="text-center">🔺🔻</p>
      <div className="sorting">
        <select
          defaultValue={"DEFAULT"}
          onChange={(e) => setSortState(e.target.value)}
        >
          <option value="DEFAULT" disabled>
            Sort by
          </option>
          <option value="location">Distance</option>
          <option value="age">Age</option>
          <option value="fame">Popularity</option>
        </select>
      </div>
      <div className="recommended-btn">
        <button className="btn btn-warning" onClick={() => setShow(!show)}>
          {" "}
          You have the most in common with ▼
        </button>
      </div>
      {show ? (
        <Recommended filtered={filtered} socket={socket} user={user} />
      ) : null}
      <div className="dashboard">
        {distance &&
          distance.map((user) => {
            if (user.profile_pic.length > 0) {
              return (
                <div
                  key={user.id}
                  className="card mb-4"
                  style={{ width: "30rem" }}
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
                        <StarRating rating={user.fame/2} /> <br />
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
            } else {
              return <p> Upload your picture to get started!</p>;
            }
          })}
      </div>
    </div>
  );
};

export default Dashboard;
