import React, { useEffect, useRef, useState } from "react";

interface AutocompleteProps {
  options: string[];
  onChange: (value: string) => void;
  name: string;
  value?: string;
  label?: string;
}

const Autocomplete: React.FC<AutocompleteProps> = (props) => {
  const { name, label, value, options, onChange } = props;
  const [inputValue, setInputValue] = useState("");
  const [suggestedOptions, setSuggestedOptions] = useState<string[]>([]);
  const autocompleteRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestedOptions(filteredOptions);
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
        <input
          style={{
            border: "1px solid black",
            padding: "10px",
            //   borderRadius: "5px",
            width: "100%",
            height: "20px",
          }}
          type="text"
          value={inputValue}
          placeholder={label || name}
          name={name}
          defaultValue={value}
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
