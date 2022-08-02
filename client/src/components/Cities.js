import React, { useState } from "react";
import Select from "react-select";

const options = [
  { label: "Espoo", value: "espoo" },
  { label: "Helsinki", value: "helsinki" },
  { label: "Hämeenlinna", value: "hameenlinna" },
  { label: "Jyväskylä", value: "jyvaskyla" },
  { label: "Kajaani", value: "kajaani" },
  { label: "Kokkola", value: "kokkola" },
  { label: "Kotka", value: "kotka" },
  { label: "Kouvola", value: "kouvola" },
  { label: "Kuopio", value: "kuopio" },
  { label: "Lahti", value: "lahti" },
  { label: "Lappeenranta", value: "lappeenranta" },
  { label: "Oulu", value: "oulu" },
  { label: "Pori", value: "pori" },
  { label: "Tampere", value: "tampere" },
  { label: "Turku", value: "turku" },
  { label: "Vantaa", value: "vantaa" },
];

const Cities = ({ setCity }) => {
  const [selected, setSelected] = useState([]);
  console.log(selected);
  return (
    <div>
      <Select
        options={options}
        onChange={(choice) => {
          setSelected(choice.value);
          setCity(choice.value);
        }}
        labelledBy="Select"
      />
    </div>
  );
};

export default Cities;
