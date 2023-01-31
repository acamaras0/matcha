import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import useGetDistance from "../utils/useGetDistance";
import { getCookie } from "react-use-cookie";
import Recommended from "../components/RecommendedMatches";
import img from "../assets/suggestions.png";

const Dashboard = ({ socket }) => {
  const [user, setUser] = useState([]);
  const [sortState, setSortState] = useState("none");
  const distance = useGetDistance();
  const cookie = getCookie("refreshToken");
  let filtered = [];
  useEffect(() => {
    if (cookie !== "") {
      const getLoggedIn = async () => {
        const response = await axios.get(
          `http://localhost:5000/user/${cookie}`,
          {}
        );
        setUser(response.data);
      };
      getLoggedIn();
    }
  }, [setUser, cookie]);

  if (cookie === "") {
    return <Redirect to="/" />;
  }

  const sortMethods = {
    none: { method: (a, b) => null },
    location: { method: (a, b) => a.distance - b.distance },
    fame: { method: (a, b) => b.fame - a.fame },
    age: { method: (a, b) => a.birthdate - b.birthdate },
  };

  if (distance) {
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
        const allCommon = loggedInterests.every((value) => {
          return result.includes(value);
        });

        const multipleExist = loggedInterests.some((value) => {
          return result.includes(value);
        });

        if (allCommon || multipleExist) {
          filtered.push(u);
        }
      }
      filtered.sort((a, b) =>
        a.interests.length > b.interests.length ? -1 : 1
      );
      return filtered;
    });
    filtered.sort(sortMethods[sortState].method);
  }
  if (!distance || !filtered) {
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (distance.length === 0 || filtered.length === 0)
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="dashboard-wrap">
      <br />
      <div className="suggestions-logo">
        <img className="suggestions-img" src={img} alt="suggestions" />
      </div>
      <br />
      <div className="sorting">
        <select
          defaultValue={"DEFAULT"}
          onChange={(e) => setSortState(e.target.value)}
        >
          <option value="DEFAULT" disabled>
            Show by
          </option>
          <option value="location">Distance</option>
          <option value="age">Age</option>
          <option value="fame">Popularity</option>
        </select>
      </div>
      <div className="recommended-btn"></div>
      {user.profile_pic ? (
        <Recommended filtered={filtered} socket={socket} user={user} />
      ) : (
        <p className="text-center no-pic">
          Upload a profile picture and let's get started!
        </p>
      )}
    </div>
  );
};

export default Dashboard;
