import React from "react";
import { colors } from "../data/style";
import Plus from "../icons/plusmito.svg";
import airplane from "../icons/airplane.svg";
import { useLocation } from "react-router-dom";
import { Location } from "../types/generalTypes";
import FlightSelector from "../components/FlightSelector";

const SelectFlight = () => {
  const location: Location = useLocation();
  const { origin, destination, departureDate, returnDate } = location.state;
  console.log(location);
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
      </div>
      <div
        style={{
          color: colors.primary,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          fontSize: "30px",
          marginBottom: "10px",
        }}
      >
        <img
          src={airplane}
          style={{
            height: "30px",
            paddingRight: "30px",
            paddingLeft: "10px",
          }}
          alt="airplane"
        />
        SELECT FLIGHT
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr",
        }}
      >
        <div>pay for the flight</div>
        <div>
          <FlightSelector
            label="outbound"
            origin={origin}
            destination={destination}
            departureDate={departureDate}
          />
          {returnDate && (
            <FlightSelector
              label="inbound"
              origin={destination}
              destination={origin}
              departureDate={returnDate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectFlight;
