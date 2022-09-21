/* eslint-disable */
import React, { useContext,useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import StarRating from "../models/StarRating";
import useGetDistance from "../utils/useGetDistance";
import { format } from "timeago.js";
import { UserContext } from "../context/UserContext";


const Dashboard = ({ socket }) => {
  const [loggedIn, setLoggedin] = useState("");
  const [sender, setSender] = useState("");
  const [senderId, setSenderId] = useState("");
  const { user, setUser } = useContext(UserContext);

  // const [users, setUsers] = useState([]);
  const [message, setMessage] = useState([]);
  const [cookie, setCookie] = useCookies(["refreshToken"]);
  const history = useHistory();
  const distance = useGetDistance();

  useEffect(() => {
    const getLoggedIn = async () => {
      const response = await axios.get(
        `http://localhost:5000/user/${cookie.refreshToken}`,
        {}
      );
      setUser(response.data);
      setLoggedin(response.data.id);
      setSender(response.data.username);
      setSenderId(response.data.id);
    };
    getLoggedIn();

    // const getUsers = async () => {
    //   const response = await axios.get(
    //     `http://localhost:5000/users/info/${cookie.refreshToken}`,
    //     {}
    //   );
    //   setUsers(response.data);
    // };
    // getUsers();
  }, [cookie.refreshToken]);

  const handleUserSelect = async (id) => {
    socket.emit("sendNotification", {
      senderName: sender,
      senderId: senderId,
      receiverName: id,
      type: "profile view",
    });
    history.push(`/users/${id}`);
  };

  const handleReport = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/report/${loggedIn}/${id}`
      );
      setMessage(response.data.msg);
    } catch (error) {
      if (error.response) console.log("error", error.response.data);
    }
  };
  if (!cookie.refreshToken) {
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
                        <StarRating rating={user.fame} /> <br />
                        <p className="card-text">
                          About {Math.round(user.distance / 1000)} km away
                        </p>
                        <div>
                          <a
                            onClick={() => handleReport(user.id)}
                            className="report"
                            href=""
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
