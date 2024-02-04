import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { colors } from "../data/style";
import erroricon from "../icons/erroricon.svg";
import calendar from "../icons/calendar1.svg";
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
          marginBottom: "40px",
          // position: "static",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            marginTop: value ? "-20px" : "0px",
            marginLeft: "-160px",
            width: "20px",
            // top: "-5px",
            // width: "100%",
            // backgroundColor: "white",
            fontSize: "13px",
            padding: "5px",
            zIndex: 100,
          }}
        >
          {label}
        </div>
        <ReactDatePicker
          className={error ? "error-date-picker" : "date-picker"}
          selected={value}
          onChange={(date) => onChange(date as Date)}
          name={name}
        />
        <img
          src={calendar}
          style={{
            position: "absolute",
            height: "20px",
            // marginTop: "-10px",
            marginLeft: "170px",
            zIndex: 5,
          }}
          alt="calendar"
        />
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          height: "0px",
          marginTop: "-20px",
          marginLeft: "10px",
          // zIndex: 10000,
          width: "100%",
        }}
      >
        {error && (
          <div
            style={{
              color: colors.error,
              width: "100%",
              // width: "200px",
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
            <div
              style={{
                width: "190px",
                height: "20px",
                marginTop: "6px",
              }}
            >
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DateSelector;
