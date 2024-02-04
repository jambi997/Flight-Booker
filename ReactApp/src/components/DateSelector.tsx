import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { colors } from "../data/style";
import erroricon from "../icons/erroricon.svg";

interface TextfieldProps {
  name: string;
  value?: Date | null;
  onChange: (value: Date) => void;
  label?: string;
  error?: string;
  type?: "text" | "autocomplete" | "date";
}
const DateSelector = (props: TextfieldProps) => {
  const { name, label, value, onChange, type, error } = props;
  return (
    <div>
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
          marginBottom: "30px",
          // position: "static",
          zIndex: 0,
        }}
      >
        <ReactDatePicker
          className={error ? "error-date-picker" : "date-picker"}
          selected={value}
          onChange={(date) => onChange(date as Date)}
          name={name}
          
        />
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          height: "0px",
          marginTop: "-15px",
          marginLeft: "10px",
          zIndex: 10000,
          width: "100%",
        }}
      >
        {error && (
          <div
            style={{
              color: colors.error,
              width: "100%",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={erroricon}
              style={{
                height: "15px",
                paddingRight: "5px",
              }}
              alt="error"
            />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default DateSelector;
