import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TextfieldProps {
  name: string;
  value?: Date | null;
  onChange: (value: string) => void;
  label?: string;
  type?: "text" | "autocomplete" | "date";
}
const DateSelector = (props: TextfieldProps) => {
  const { name, label, value, onChange, type } = props;
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
        position: "static",
        zIndex: 0,
      }}
    >
      <ReactDatePicker
        className="date-picker"
        selected={new Date()}
        onChange={(date) => onChange(date?.toString() || "")}
        name={name}
      />
    </div>
  );
};

export default DateSelector;
