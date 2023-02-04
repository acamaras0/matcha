import useGetDistance from "../utils/useGetDistance";
import React, { useEffect, useState } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import { getLoggedIn } from "../service/auth";
import {
  getMatch,
  countTotalViews,
  getPicture,
  checkLiked,
  blockUser,
  handleLikeDislike,
  reportUser,
} from "../service/user";
import StarRating from "../components/StarRating";
import Gallery from "../components/Gallery";
import img from "../assets/yellow-heart.png";
import img1 from "../assets/broken-heart.png";

const ProfileMatch = ({ socket }) => {
  const { id } = useParams();
  const [selectedUser, setSelectedUser] = useState([]);
  const [user, setUser] = useState([]);
  const [pics, setPics] = useState([]);
  const [likes, setLikes] = useState("");
  const [liked, setLiked] = useState("");
  const [message, setMessage] = useState("");
  const [report, setReport] = useState("");
  const cookie = getCookie("refreshToken");
  const history = useHistory();
  const distance = useGetDistance();

  useEffect(() => {
    if (cookie !== "") {
      const getUser = async () => {
        const response = await getLoggedIn(cookie);
        setUser(response);
      };
      getUser();
    }
  }, [cookie]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMatch(id);
        setSelectedUser(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    const getPicPath = async () => {
      const response = await getPicture(id);
      setPics(response);
    };
    getPicPath();

    const count = async () => {
      try {
        const response = await countTotalViews(id);
        setLikes(response.fame);
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
          const response = await checkLiked(id, user.id);
          setLiked(response.msg);
        } catch (error) {
          console.log(error);
        }
      }
    };
    checkIfLiked();
  }, [setLiked, id, user]);

  const block = async (id) => {
    if (user && id) {
      try {
        await blockUser(user.id, id);
        history.push("/dashboard");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLike = async (id, username) => {
    if (user && user.id && id) {
      setLiked("like");
      try {
        const response = await handleLikeDislike(user.id, id);
        setMessage(response.msg);
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
          socket.emit("sendNotification", {
            senderName: username,
            senderId: id,
            receiverName: user.id,
            type: "matchy",
          });
        }
      } catch (error) {
        if (error.response) {
          console.log("error", error.response);
        }
      }
    }
  };

  const handleDislike = async (id) => {
    if (user && user.id && id) {
      setLiked("not liked");
      try {
        const response = await handleLikeDislike(user.id, id);
        setMessage(response.msg);
      } catch (error) {
        if (error.response) {
          console.log("error", error.response);
        }
      }
      socket.emit("sendNotification", {
        senderName: user.username,
        senderId: user.id,
        receiverName: id,
        type: "unlike",
      });
    }
  };

  const handleReport = async (id) => {
    if (user && user.id && id) {
      try {
        const response = await reportUser(user.id, id);
        setReport(response.msg);
      } catch (error) {
        if (error.response) console.log("error", error.response);
      }
    }
  };

  if (cookie === "") {
    return <Redirect to="/" />;
  }
  if (selectedUser.length === 0 || !distance) {
    return (
      <div>
        <p className="text-center">Loading...</p>
      </div>
    );
  } else {
    return (
      <div>
        <div className="text-center mt-5">
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
                      onClick={() =>
                        handleLike(selectedUser.id, selectedUser.username)
                      }
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
          <div className="mb-5">
            <button
              onClick={() => handleReport(selectedUser.id)}
              className="btn btn-dark"
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

export default ProfileMatch;
