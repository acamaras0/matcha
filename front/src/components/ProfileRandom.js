// /* eslint-disable */
import useGetDistance from "../utils/useGetDistance";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import StarRating from "../models/StarRating";
import Gallery from "../models/Gallery";
import { useCookies } from "react-cookie";
import img from "../assets/yellow-heart.png";
import img1 from "../assets/broken-heart.png";
// import img2 from "../assets/match.png";

const ProfileRandom = ({ socket }) => {
  const { id } = useParams();
  const { selectedUser, setSelectedUser } = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);
  const [pics, setPics] = useState([]);
  const [likes, setLikes] = useState("");
  const [loggedIn, setLoggedIn] = useState("");
  const [liked, setLiked] = useState(false);
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [senderId, setSenderId] = useState("");
  const history = useNavigate();
  const distance = useGetDistance();
  const [cookie, setCookie] = useCookies(["refreshToken"]);

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

    const getLoggedIn = async () => {
      const response = await axios.get(
        `http://localhost:5000/user/${cookie.refreshToken}`,
        {}
      );
      setLoggedIn(response.data.id);
      setSender(response.data.username);
      setSenderId(response.data.id);
    };
    getLoggedIn();

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

    const checkIfLiked = async () => {
      if (loggedIn !== "") {
        try {
          const response = await axios.get(
            `http://localhost:5000/liked/${id}/${loggedIn}`
          );
          console.log("like", response.data.msg);
          setLiked(response.data.msg);
        } catch (error) {
          console.log(error);
        }
      }
    };
    checkIfLiked();
  }, [id, setSelectedUser, setLikes, cookie.refreshToken, loggedIn]);

  const block = async (id) => {
    try {
      await axios.post(`http://localhost:5000/block/${loggedIn}/${id}`, {});
      history("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/like/${loggedIn}/${id}`,
        {}
      );
      setMessage(response.data.msg);
    } catch (error) {
      if (error.response) {
        console.log("error", error.response.data);
      }
    }
    socket.emit("sendNotification", {
      senderName: sender,
      senderId: senderId,
      receiverName: id,
      type: "like",
    });
  };

  const handleDislike = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/like/${loggedIn}/${id}`,
        {}
      );
      setMessage(response.data.msg);
    } catch (error) {
      if (error.response) {
        console.log("error", error.response.data);
      }
    }
    socket.emit("sendNotification", {
      senderName: sender,
      senderId: senderId,
      receiverName: id,
      type: "unlike",
    });
  };

  if (!cookie.refreshToken) {
    history("/");
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
          <p className="card-text">{selectedUser.username}</p>
          <p className="text-center">
            About {distance && Math.round(distance[0]?.distance / 1000)} km away
          </p>
          <StarRating rating={likes} />
          <div className="card-img">
            <Gallery galleryImages={pics} />
          </div>
          <div style={{ margin: "10%" }}>
            <div className="card">
              <div className="heart-container">
                {liked && liked === "dislike" ? (
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
              </div>
            </div>{" "}
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
