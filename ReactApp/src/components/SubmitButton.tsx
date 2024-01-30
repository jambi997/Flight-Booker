import React from "react";
import { colors } from "../data/style";

interface SubmitButtonProps {
  label: string;
}

const SubmitButton = (props: SubmitButtonProps) => {
  const { label } = props;
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button
        style={{
          border: "1px solid black",
          padding: "10px",
          //   borderRadius: "5px",
          width: "200px",
          backgroundColor: colors.primary,
          color: colors.text1,
          cursor: "pointer",
        }}
        type="submit"
      >
        {label}
      </button>
    </div>
  );
};

export default SubmitButton;
