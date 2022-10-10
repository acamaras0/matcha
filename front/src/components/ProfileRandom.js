import useGetDistance from "../utils/useGetDistance";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getCookie } from "react-use-cookie";
import axios from "axios";
import StarRating from "../models/StarRating";
import Gallery from "../models/Gallery";
import img from "../assets/yellow-heart.png";
import img1 from "../assets/broken-heart.png";

const ProfileRandom = ({ socket }) => {
  const { id } = useParams();
  const { selectedUser, setSelectedUser } = useContext(UserContext);
  const [user, setUser] = useState([]);
  const [pics, setPics] = useState([]);
  const [likes, setLikes] = useState("");
  const [liked, setLiked] = useState("");
  const [message, setMessage] = useState("");
  const [report, setReport] = useState("");
  const xsrfToken = getCookie("refreshToken");
  const history = useHistory();
  const distance = useGetDistance();

  if (message) {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  }

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
  }, [xsrfToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setSelectedUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    const getPicPath = async () => {
      const response = await axios.get(
        `http://localhost:5000/user/pictures/${id}`,
        {}
      );
      setPics(response.data);
    };
    getPicPath();

    const count = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/fame/${id}`
        );
        setLikes(response.data.fame);
      } catch (error) {
        console.log(error);
      }
    };
    count();
  }, [id, setSelectedUser, setLikes, user]);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (user !== "") {
        try {
          const response = await axios.get(
            `http://localhost:5000/liked/${id}/${user.id}`
          );
          setLiked(response.data.msg);
        } catch (error) {
          console.log(error);
        }
      }
    };
    checkIfLiked();
  }, [setLiked, id, user]);

  const block = async (id) => {
    try {
      await axios.post(`http://localhost:5000/block/${user.id}/${id}`, {});
      history.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (id) => {
    setLiked("like");
    try {
      const response = await axios.post(
        `http://localhost:5000/like/${user.id}/${id}`,
        {}
      );
      setMessage(response.data.msg);
      if (response.data.msg === "Liked!") {
        socket.emit("sendNotification", {
          senderName: user.username,
          senderId: user.id,
          receiverName: id,
          type: "like",
        });
      } else {
        socket.emit("sendNotification", {
          senderName: user.username,
          senderId: user.id,
          receiverName: id,
          type: "match",
        });
      }
    } catch (error) {
      if (error.response) {
        console.log("error", error.response.data);
      }
    }
  };

  const handleDislike = async (id) => {
    setLiked("not liked");
    try {
      const response = await axios.post(
        `http://localhost:5000/like/${user.id}/${id}`,
        {}
      );
      setMessage(response.data.msg);
    } catch (error) {
      if (error.response) {
        console.log("error", error.response.data);
      }
    }
    socket.emit("sendNotification", {
      senderName: user.username,
      senderId: user.id,
      receiverName: id,
      type: "unlike",
    });
  };

  const handleReport = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/report/${user.id}/${id}`
      );
      setReport(response.data.msg);
    } catch (error) {
      if (error.response) console.log("error", error.response.data);
    }
  };

  if (xsrfToken === "") {
    history.push("/");
  }
  if (!selectedUser && !distance) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="text-center">
          <h2 className="text-center">
            {selectedUser.firstname} {selectedUser.lastname}
          </h2>
          <p className="text-center">
            {selectedUser.city}, {selectedUser.country}
          </p>
          <img
            alt="backup"
            className="prof-pic"
            src={selectedUser.profile_pic}
          />
          <div>
            <StarRating rating={likes} />
          </div>
          <div className="random-card">
            <div className="card" style={{ width: "60rem" }}>
              <div className="card-img">
                {pics.length >= 0 ? (
                  <Gallery galleryImages={pics} />
                ) : (
                  <p className="no-pics">No pics available.</p>
                )}
              </div>{" "}
              <br />
              <div className="heart-container">
                {liked && liked === "not liked" ? (
                  <div className="like-container">
                    <img
                      onClick={() => handleLike(selectedUser.id)}
                      className="like"
                      src={img}
                      alt="Card cap"
                    />
                    <div>
                      <p className="card-text">{message}</p>
                    </div>
                  </div>
                ) : (
                  <div className="dislike-container">
                    <img
                      onClick={() => handleDislike(selectedUser.id)}
                      className="dislike"
                      src={img1}
                      alt="Card cap"
                    />
                    <div>
                      <p className="card-text">{message}</p>
                    </div>
                  </div>
                )}
              </div>{" "}
              <div className="card-body">
                <label>Age</label>
                <p className="card-text">{selectedUser.birthdate}</p>
                <label>Bio</label>
                <p className="card-text">{selectedUser.bio}</p>
                <label>Gender</label>
                <p className="card-text">{selectedUser.gender}</p>
                <label>Sexual Orientation</label>
                <p className="card-text">{selectedUser.orientation}</p>
                <label>Interests</label>
                <p className="card-text">{selectedUser.interests}</p>
                <label>
                  {selectedUser.username}'s profile has been viewed{" "}
                  {selectedUser.profile_views} time(s).
                </label>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => handleReport(user.id)}
              className="btn btn-warning"
            >
              Report fake account
            </button>
            <p className="message">{report}</p>
            <br />
            <button
              onClick={() => block(selectedUser.id)}
              className="btn btn-danger"
            >
              Block
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileRandom;
