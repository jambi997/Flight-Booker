import React from "react";
import { cities } from "../data/data";
import DatePicker from "react-datepicker";
import Autocomplete from "./Autocomplete";

import "react-datepicker/dist/react-datepicker.css";
interface TextfieldProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const Textfield = (props: TextfieldProps) => {
  const { name, label, value, onChange} = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        justifyItems: "center",
        paddingLeft: "10px",
        paddingRight: "10px",
        margin: "10px",
      }}
    >
        <input
          style={{
            border: "1px solid black",
            padding: "10px",
            //   borderRadius: "5px",
            width: "100%",
          }}
          id={name}
          name={name}
          placeholder={name}
          type="text"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
    </div>
  );
};

export default Textfield;