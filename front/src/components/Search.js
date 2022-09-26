import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import MultiRangeSlider from "multi-range-slider-react";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Search = () => {
  const id = useParams().id;
  const { user } = useContext(UserContext);
  const history = useHistory();

  const [minAge, set_minAge] = useState(18);
  const [maxAge, set_maxAge] = useState(99);

  const [minFame, set_minFame] = useState(0);
  const [maxFame, set_maxFame] = useState(100);

  const [minDist, set_minDist] = useState(5);
  const [maxDist, set_maxDist] = useState(75);

  const [byAge, setByAge] = useState([]);

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

  useEffect(() => {
    const byAge = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/byAge/${id}/${minAge}/${maxAge}`
        );
        setByAge(res.data);
        console.log("here", res);
      } catch (err) {
        console.log(err);
      }
    };
    byAge();
  }, [minAge, maxAge, id]);

  console.log(user);

  if (user.length < 1) history.push("/");
  if (!byAge) return <div>Loading...</div>;
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
      <label>By tags</label>
      <div>{byAge && byAge.map((item) => item.username)}</div>
    </div>
  );
};

export default Search;
