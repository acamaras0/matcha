import React, { useState } from "react";
import  Select  from  "react-select";

const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Agender", value: "agender"},
    { label: "Androgyne", value: "androgyne"},
    { label: "Cisgender", value: "cisgender"},
    { label: "Transgender", value: "transgender"},
    { label: "Helicopter", value: "helicopter"},
    { label: "Etc.", value: "etc"},
  ];

  const Gender = ({setGender}) => {
    const [selected, setSelected] = useState([]);
  
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