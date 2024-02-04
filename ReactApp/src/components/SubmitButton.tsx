import React from "react";
import { colors } from "../data/style";

interface SubmitButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const SubmitButton = (props: SubmitButtonProps) => {
  const { label, disabled, onClick } = props;
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          border: "1px solid black",
          padding: "10px",
          //   borderRadius: "5px",
          width: "200px",
          backgroundColor: disabled ? "gray" : colors.primary,
          color: colors.text1,
          cursor: "pointer",
        }}
        type={onClick ? "button" : "submit"}
      >
        {label}
      </button>
    </div>
  );
};

export default SubmitButton;
