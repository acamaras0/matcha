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
  const [sortState, setSortState] = useState("none");

  const [user, setUser] = useState();
  const distance = useGetDistance();

  const [minAge, set_minAge] = useState(18);
  const [maxAge, set_maxAge] = useState(99);

  const [minFame, set_minFame] = useState(0);
  const [maxFame, set_maxFame] = useState(100);

  const [minDist, set_minDist] = useState(0);
  const [maxDist, set_maxDist] = useState(800);

  const [interests, setInterests] = useState([]);
  const [usersFiltered, setUsersFiltered] = useState([]);

  const [show, setShow] = useState(false);

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
    // setShow(false);
    set_minDist(e.minValue);
    set_maxDist(e.maxValue);
  };

  const search = () => {
    let filtered = distance;
    filtered = filtered.filter((km) => {
      return km.distance / 1000 >= minDist && km.distance / 1000 <= maxDist;
    });

    filtered = filtered.filter((age) => {
      return age.birthdate >= minAge && age.birthdate <= maxAge;
    });

    filtered = filtered.filter((fame) => {
      return fame.fame >= minFame && fame.fame <= maxFame;
    });

    let final = [];
    if (interests.length) {
      filtered.forEach((user) => {
        let result = user.interests.split(",");
        for (let index = 0; index < result.length; index++) {
          result[index] = result[index].replace(/^\s+|\s+$/gm, "");
        }
        const multipleExist = interests.every((value) => {
          return result.includes(value);
        });
        if (multipleExist) {
          final.push(user);
        }
      });
    }
    setShow(true);
    setUsersFiltered(final);
  };

  const sortMethods = {
    none: { method: (a, b) => null },
    location: { method: (a, b) => a.distance - b.distance },
    fame: { method: (a, b) => b.fame - a.fame },
    age: { method: (a, b) => a.birthdate - b.birthdate },
  };

  if (distance) {
    usersFiltered.sort(sortMethods[sortState].method);
  }

  if (xsrfToken === "") {
    return <Redirect to="/" />;
  }
  if (!distance || !usersFiltered) return <div>Loading...</div>;
  return (
    <div className="filter">
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
      <div>
        <label>By age</label>
        <div onClick={() => setShow(false)}>
          <MultiRangeSlider
            ruler={false}
            style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
            barLeftColor="yellow"
            barInnerColor="red"
            barRightColor="yellow"
            min={18}
            max={99}
            minValue={18}
            maxValue={99}
            step={1}
            onInput={(e) => {
              handleAge(e);
            }}
          />
        </div>
      </div>
      <div>
        <label>By popularity</label>
        <div onClick={() => setShow(false)}>
          <MultiRangeSlider
            ruler={false}
            style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
            barLeftColor="yellow"
            barInnerColor="red"
            barRightColor="yellow"
            min={0}
            max={100}
            minValue={0}
            maxValue={100}
            step={1}
            onInput={(e) => {
              handleFame(e);
            }}
          />
        </div>
      </div>
      <div>
        <div onClick={() => setShow(false)}>
          <label>By distance</label>
          <MultiRangeSlider
            ruler={false}
            style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
            barLeftColor="yellow"
            barInnerColor="red"
            barRightColor="yellow"
            min={0}
            max={800}
            minValue={0}
            maxValue={800}
            step={1}
            onInput={(e) => {
              handleDistance(e);
            }}
          />
        </div>
      </div>
      <div>
        <label>By tags</label>
        <Tags setInterests={setInterests} />
        <div className="recommended-btn">
          <button className="btn btn-warning" onClick={search}>
            Search!
          </button>
        </div>
        {show ? (
          <Card array={usersFiltered} socket={socket} user={user} />
        ) : null}
      </div>
    </div>
  );
};

export default Search;
