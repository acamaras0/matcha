import React, { useState } from "react";
import Select from "react-select";

const options = [
  { label: "Heterosexual", value: "heterosexual" },
  { label: "Homosexual", value: "homosexual" },
  { label: "Bisexual", value: "bisexual" },
];

const Orientation = ({setOrientation}) => {
  const [selected, setSelected] = useState([]);
  console.log(selected);

  return (
    <div>
      <Select
        options={options}
        onChange={(choice) => {
          setSelected(choice.value);
          setOrientation(choice.value);
        }}
        labelledBy="Select"
      />
    </div>
  );
};

export default Orientation;
