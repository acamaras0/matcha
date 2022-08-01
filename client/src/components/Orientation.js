import React, { useState } from "react";
import  Select  from  "react-select";

const options = [
    { label: "Heterosexual", value: "heterosexual" },
    { label: "Homosexual", value: "homosexual" },
    { label: "Bisexual", value: "bisexual" },
  ];

  const Orientation = () => {
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
  
  export default Orientation;