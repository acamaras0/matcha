import React from "react";
import Select from "react-select";

const options = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const Gender = ({ setGender }) => {
  return (
    <div>
      <Select
        options={options}
        onChange={(choice) => {
          setGender(choice.value);
        }}
        labelledBy="Select"
      />
    </div>
  );
};

export default Gender;
