import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import useGetDistance from "../utils/useGetDistance";
import { UserContext } from "../context/UserContext";
import { getCookie } from "react-use-cookie";
import Recommended from "../models/Recommended";

const Dashboard = ({ socket }) => {
  const { user, setUser } = useContext(UserContext);
  const [sortState, setSortState] = useState("none");
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

  if (distance.length === 0)
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="dashboard-wrap">
      <br />
      <h3 className="text-center">▼ Suggestions ▼</h3>
      <br />
      <p className="text-center">🔺🔻</p>
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
      <Recommended filtered={filtered} socket={socket} user={user} />
    </div>
  );
};

export default Dashboard;
