import React from "react";
import arrow from "../icons/arrow.svg";
import { colors } from "../data/style";
import { isMobile } from "react-device-detect";

interface FlightSelectorProps {
  label: string;
  origin: string;
  destination: string;
}

const FlightSelectorTop = (props: FlightSelectorProps) => {
  const { label, origin, destination } = props;
  return (
    <div
      style={
        {
          // // width: "90%",
          // marginBottom: "30px",
          // backgroundColor: "white",
          // border: "1px solid lightgrey",
          // boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.75)",
        }
      }
    >
      <div
        style={{
          backgroundColor: colors.lightgray,
          padding: "10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div
          style={{
            marginRight: "20px",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
        <div
          style={{
            color: colors.primary,
            fontWeight: "bold",
          }}
        >
          {origin}
        </div>
        <img
          src={arrow}
          style={{
            height: "5px",
            paddingRight: "20px",
            paddingLeft: "20px",
          }}
          alt="arrow"
        />
        <div
          style={{
            color: colors.primary,
            fontWeight: "bold",
          }}
        >
          {destination}
        </div>
      </div>
    </div>
  );
};

export default FlightSelectorTop;
