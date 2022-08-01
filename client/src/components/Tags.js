import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
    { label: "Travel", value: "travel" },
    { label: "Music", value: "music" },
    { label: "Movies", value: "movies" },
    { label: "Books", value: "books" },
    { label: "Sports", value: "sports" },
    { label: "Food", value: "food" },
    { label: "Gaming", value: "gaming" },
    { label: "Art", value: "art" },
    { label: "Photography", value: "photography" },
    { label: "Fashion", value: "fashion" },
];

const Tags = () => {
  const [selected, setSelected] = useState([]);

  return (
    <div>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
};

export default Tags;



