import React, { useState } from "react";
import Select from "react-select";

const options = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const Gender = ({ setGender }) => {
  const [selected, setSelected] = useState([]);
  console.log(selected);
  return (
    <div>
      <Select
        options={options}
        onChange={(choice) => {
          setSelected(choice.value);
          setGender(choice.value);
        }}
        labelledBy="Select"
      />
    </div>
  );
};

export default Gender;
