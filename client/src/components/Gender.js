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

  const Gender = () => {
    const [selected, setSelected] = useState([]);
  
    return (
      <div>
        <Select
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
        />
      </div>
    );
  };
  
  export default Gender;