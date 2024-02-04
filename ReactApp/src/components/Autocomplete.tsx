import React, { useEffect, useRef, useState } from "react";
import { colors } from "../data/style";
import erroricon from "../icons/erroricon.svg";

interface AutocompleteProps {
  options: string[];
  onChange: (value: string) => void;
  name: string;
  error?: string;
  value?: string;
  label?: string;
}

const Autocomplete: React.FC<AutocompleteProps> = (props) => {
  const { name, label, value, error, options, onChange } = props;
  const [inputValue, setInputValue] = useState(value || "");
  const [suggestedOptions, setSuggestedOptions] = useState<string[]>([]);
  const autocompleteRef = useRef<HTMLInputElement>(null);
  console.log(name, error);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestedOptions(filteredOptions);
    if (inputValue === "") {
      onChange("");
    }
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setSuggestedOptions([]);
    onChange(option);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      autocompleteRef.current &&
      !autocompleteRef.current.contains(e.target as Node)
    ) {
      setSuggestedOptions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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
        marginBottom: "30px",
      }}
    >
      {" "}
      <div
        ref={autocompleteRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
          position: "relative",
        }}
      >
        {inputValue && (
          <div
            style={{
              position: "absolute",
              top: "-5px",
              width: "100%",
              // backgroundColor: "white",
              fontSize: "13px",
              padding: "5px",
              zIndex: 1000,
            }}
          >
           {label}
          </div>
        )}
        <input
          style={{
            border: error ? `2px solid ${colors.error}` : "1px solid black",
            boxShadow: error && `0px 0px 4px 0px ${colors.error}`,
            padding: "10px",
            paddingBottom: "5px",
            //   borderRadius: "5px",
            width: "100%",
            height: "20px",
            backgroundColor: error && colors.lighterror,
            // textAlign: "end",
          }}
          type="text"
          value={inputValue}
          placeholder={label || name}
          name={name}
          onChange={handleInputChange}
          onFocus={() => {
            const filteredOptions = options.filter((option) =>
              option.toLowerCase().includes(inputValue.toLowerCase())
            );
            setSuggestedOptions(filteredOptions);
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            height: "0px",
            marginTop: "70px",
            width: "110%",
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
        <div
          style={{
            display: "flex",
            position: "absolute",
            height: "0px",
            marginTop: "30px",
            width: "110%",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              // height: "100%",
            }}
          >
            {suggestedOptions.map((option, index) => (
              <div
                className="hover"
                key={index}
                onClick={() => handleOptionClick(option)}
                style={{
                  backgroundColor: "white",
                  border: "1px solid black",
                  borderTop: "none",
                  cursor: "pointer",
                  padding: "2px",
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Autocomplete;
