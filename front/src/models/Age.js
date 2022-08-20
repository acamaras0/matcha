import React, { useState } from "react";
//import { MultiSelect } from "react-multi-select-component";
import Select from "react-select";

const options = [
    { label: "18", value: "18" },
    { label: "19", value: "19" },
    { label: "20", value: "20" },
    { label: "21", value: "21" },
    { label: "22", value: "22" },
    { label: "23", value: "23" },
    { label: "24", value: "24" },
    { label: "25", value: "25" },
    { label: "26", value: "26" },
    { label: "27", value: "27" },
    { label: "28", value: "28" },
    { label: "29", value: "29" },
    { label: "30", value: "30" },
    { label: "31", value: "31" },
    { label: "32", value: "32" },
    { label: "33", value: "33" },
    { label: "34", value: "34" },
    { label: "35", value: "35" },
    { label: "36", value: "36" },
    { label: "37", value: "37" },
    { label: "38", value: "38" },
    { label: "39", value: "39" },
    { label: "40", value: "40" },
    { label: "41", value: "41" },
    { label: "42", value: "42" },
    { label: "43", value: "43" },
    { label: "44", value: "44" },
    { label: "45", value: "45" },
    { label: "46", value: "46" },
    { label: "47", value: "47" },
    { label: "48", value: "48" },
    { label: "49", value: "49" },
    { label: "50", value: "50" },
    { label: "51", value: "51" },
    { label: "52", value: "52" },
    { label: "53", value: "53" },
    { label: "54", value: "54" },
    { label: "55", value: "55" },
    { label: "56", value: "56" },
    { label: "57", value: "57" },
    { label: "58", value: "58" },
    { label: "59", value: "59" },
    { label: "60", value: "60" },
    { label: "61", value: "61" },
    { label: "62", value: "62" },
    { label: "63", value: "63" },
    { label: "64", value: "64" },
    { label: "65", value: "65" },
    { label: "66", value: "66" },
    { label: "67", value: "67" },
    { label: "68", value: "68" },
    { label: "69", value: "69" },
    { label: "70", value: "70" },
    { label: "71", value: "71" },
    { label: "72", value: "72" },
    { label: "73", value: "73" },
    { label: "74", value: "74" },
    { label: "75", value: "75" },
    { label: "76", value: "76" },
    { label: "77", value: "77" },
    { label: "78", value: "78" },
    { label: "79", value: "79" },
    { label: "80", value: "80" },
    { label: "81", value: "81" },
    { label: "82", value: "82" },
    { label: "83", value: "83" },   
];


const Age = ({setAge}) => {
  const [selected, setSelected] = useState([]);
  console.log(selected);

  return (
    <div>
      <Select
        options={options}
        onChange={(choice) => {
          setSelected(choice.value);
          setAge(choice.value);
        }}
        labelledBy="Select"
      />
    </div>
  );
};

export default Age;




