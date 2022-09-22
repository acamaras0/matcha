import React, { useState } from "react";
import Select from "react-select";

const options = [
  { label: "Espoo", value: "Espoo" },
  { label: "Helsinki", value: "Helsinki" },
  { label: "Hämeenlinna", value: "Hameenlinna" },
  { label: "Jyväskylä", value: "Jyvaskyla" },
  { label: "Kajaani", value: "Kajaani" },
  { label: "Kokkola", value: "Kokkola" },
  { label: "Kotka", value: "Kotka" },
  { label: "Kouvola", value: "Kouvola" },
  { label: "Kuopio", value: "Kuopio" },
  { label: "Lahti", value: "Lahti" },
  { label: "Lappeenranta", value: "Lappeenranta" },
  { label: "Oulu", value: "Oulu" },
  { label: "Pori", value: "Pori" },
  { label: "Tampere", value: "Tampere" },
  { label: "Turku", value: "Turku" },
  { label: "Vantaa", value: "Vantaa" },
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
