import React from "react";

interface TextfieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const Textfield = (props: TextfieldProps) => {
    const { label, value, onChange } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        justifyItems: "center",
        width: "90%",
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
        id={label}
        name={label}
        type="text"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default Textfield;
