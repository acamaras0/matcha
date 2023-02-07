import React from "react";
import { useState, useEffect } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import { Redirect } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import useGetDistance from "../utils/useGetDistance";
import Tags from "../utils/SetTags";
import Card from "../components/RenderCard";
import { getLoggedIn } from "../service/auth";
import Sort from "../components/Sort";

const Search = ({ socket }) => {
  const cookie = getCookie("refreshToken");
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
    if (cookie !== "") {
      const getUser = async () => {
        const response = await getLoggedIn(cookie);
        setUser(response);
      };
      getUser();
    }
  }, [setUser, cookie]);

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

  const handleSort = (value) => {
    setSortState(value);
  };

  if (distance) {
    usersFiltered.sort(sortMethods[sortState].method);
  }

  if (cookie === "") {
    return <Redirect to="/" />;
  }
  if (!distance || !usersFiltered) return <div>Loading...</div>;
  return (
    <>
      <div className="filter-header">
        <h3 className="text-center">Find the one for you!</h3>
        <p className="text-center">
          Here you can filter out the people based on their age, their interests
          or/and how far away they are from you.
        </p>
      </div>
      <div className="filter">
        <Sort handleSort={handleSort} sortState={sortState} />
        <div>
          <label>Age</label>
          <div onClick={() => setShow(false)}>
            <MultiRangeSlider
              ruler={false}
              style={{
                border: "none",
                boxShadow: "none",
                padding: "15px 10px",
              }}
              barLeftColor="yellow"
              barInnerColor="black"
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
          <label>Popularity</label>
          <div onClick={() => setShow(false)}>
            <MultiRangeSlider
              ruler={false}
              style={{
                border: "none",
                boxShadow: "none",
                padding: "15px 10px",
              }}
              barLeftColor="yellow"
              barInnerColor="black"
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
            <label>Distance</label>
            <MultiRangeSlider
              ruler={false}
              style={{
                border: "none",
                boxShadow: "none",
                padding: "15px 10px",
              }}
              barLeftColor="yellow"
              barInnerColor="black"
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
          <label>Tags</label>
          <Tags setInterests={setInterests} />
          <div className="recommended-btn">
            <button className="btn btn-dark" onClick={search}>
              Search!
            </button>
          </div>
        </div>
      </div>
      {show ? <Card array={usersFiltered} socket={socket} user={user} /> : null}
    </>
  );
};

export default Search;
