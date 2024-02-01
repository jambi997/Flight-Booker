import React from "react";
import { colors } from "../data/style";
import Plus from "../icons/plusmito.svg";
import { useLocation } from "react-router-dom";
import { Location } from "../types/generalTypes";

const SelectFlight = () => {
  const location: Location = useLocation();
  const { origin, destination, departureDate, returnDate } = location.state;

  return (
    <div>
      <div
        style={{
          height: "50px",
          backgroundColor: colors.primary,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          color: colors.text1,
        }}
      >
        <img
          src={Plus}
          style={{
            height: "20px",
            paddingRight: "10px",
            paddingLeft: "10px",
            // backgroundColor: "blue",
          }}
          alt="plus"
        />
        <div
        style={{
          paddingLeft: "100px",
        }}
        >

        {origin} - {destination}
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default SelectFlight;
