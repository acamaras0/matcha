import React from "react";
import { useState, useEffect } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import { Redirect } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import useGetDistance from "../utils/useGetDistance";
import Tags from "../models/Tags";
import Card from "../models/Card";
import axios from "axios";

const Search = ({ socket }) => {
  const xsrfToken = getCookie("refreshToken");
  const [user, setUser] = useState();
  const distance = useGetDistance();

  const [minAge, set_minAge] = useState(18);
  const [maxAge, set_maxAge] = useState(99);

  const [minFame, set_minFame] = useState(0);
  const [maxFame, set_maxFame] = useState(100);

  const [minDist, set_minDist] = useState(0);
  const [maxDist, set_maxDist] = useState(800);
  const [interests, setInterests] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (interests.length) {
      let filtered = [];
      distance.forEach((user) => {
        let result = user.interests.split(",");
        for (let index = 0; index < result.length; index++) {
          result[index] = result[index].replace(/^\s+|\s+$/gm, "");
        }
        const multipleExist = interests.every((value) => {
          return result.includes(value);
        });
        if (multipleExist) {
          filtered.push(user);
        }
      });
      setFilteredUsers(filtered);
    }
  }, [interests, distance]);

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

  const handleAge = (e) => {
    set_minAge(e.minValue);
    set_maxAge(e.maxValue);
  };

  const handleFame = (e) => {
    set_minFame(e.minValue);
    set_maxFame(e.maxValue);
  };

  const handleDistance = (e) => {
    set_minDist(e.minValue);
    set_maxDist(e.maxValue);
  };

  const byDistance = distance.filter((km) => {
    return km.distance / 1000 >= minDist && km.distance / 1000 <= maxDist;
  });

  const byAge = distance.filter((age) => {
    return age.birthdate >= minAge && age.birthdate <= maxAge;
  });

  const byFame = distance.filter((fame) => {
    return fame.fame >= minFame && fame.fame <= maxFame;
  });

  if (xsrfToken === "") {
    return <Redirect to="/" />;
  }
  if (!byAge || !byDistance || !byFame || !filteredUsers || !distance)
    return <div>Loading...</div>;
  return (
    <div className="filter">
      <div>
        <label>By age</label>
        <MultiRangeSlider
          ruler={false}
          style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
          barLeftColor="yellow"
          barInnerColor="red"
          barRightColor="yellow"
          min={18}
          max={99}
          step={1}
          onInput={(e) => {
            handleAge(e);
          }}
        />
        <Card array={byAge} socket={socket} user={user} />
      </div>
      <div>
        <label>By popularity</label>
        <MultiRangeSlider
          ruler={false}
          style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
          barLeftColor="yellow"
          barInnerColor="red"
          barRightColor="yellow"
          min={0}
          max={100}
          step={1}
          onInput={(e) => {
            handleFame(e);
          }}
        />
        <Card array={byFame} socket={socket} user={user} />
      </div>

      <div>
        <label>By distance</label>
        <MultiRangeSlider
          ruler={false}
          style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
          barLeftColor="yellow"
          barInnerColor="red"
          barRightColor="yellow"
          min={0}
          max={800}
          step={1}
          onInput={(e) => {
            handleDistance(e);
          }}
        />
        <Card array={byDistance} socket={socket} user={user} />
      </div>
      <div>
        <label>By tags</label>
        <Tags setInterests={setInterests} />
        <Card array={filteredUsers} socket={socket} user={user} />
      </div>
    </div>
  );
};

export default Search;
