import React from "react";
import Select from "react-select";

const options = [
  { label: "Heterosexual", value: "heterosexual" },
  { label: "Homosexual", value: "homosexual" },
  { label: "Bisexual", value: "bisexual" },
];

const Orientation = ({ setOrientation }) => {
  return (
    <div>
      <Select
        options={options}
        onChange={(choice) => {
          setOrientation(choice.value);
        }}
        labelledBy="Select"
      />
    </div>
  );
};

export default Orientation;
