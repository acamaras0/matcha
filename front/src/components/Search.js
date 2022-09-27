import React, { useContext } from "react";
import { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import { UserContext } from "../context/UserContext";
import useGetDistance from "../utils/useGetDistance";
import Tags from "../models/Tags";
import Card from "../models/Card";

const Search = ({ socket }) => {
  const { user } = useContext(UserContext);
  const distance = useGetDistance();

  const [minAge, set_minAge] = useState(18);
  const [maxAge, set_maxAge] = useState(99);

  const [minFame, set_minFame] = useState(0);
  const [maxFame, set_maxFame] = useState(100);

  const [minDist, set_minDist] = useState(0);
  const [maxDist, set_maxDist] = useState(800);
  const [interests, setInterests] = useState([]);

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

  const byTags = distance.filter(function (tag) {
    return interests.includes(tag.interests);
  });

  // if (user.length < 1) history.push("/");
  if (user.length < 1 || !byAge || !byDistance || !byFame || !byTags)
    return <div>Loading...</div>;
  return (
    <div className="search">
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
        minValue={minAge}
        maxValue={maxAge}
        onInput={(e) => {
          handleAge(e);
        }}
      />
      <Card array={byAge && byAge} socket={socket} />
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
        minValue={minFame}
        maxValue={maxFame}
        onInput={(e) => {
          handleFame(e);
        }}
      />
      <Card array={byFame && byFame} socket={socket} />
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
        minValue={minDist}
        maxValue={maxDist}
        onInput={(e) => {
          handleDistance(e);
        }}
      />
      <Card array={byDistance && byDistance} socket={socket} />

      <label>By tags</label>
      <Tags setInterests={setInterests} />
      <Card array={byTags && byTags} />
    </div>
  );
};

export default Search;
