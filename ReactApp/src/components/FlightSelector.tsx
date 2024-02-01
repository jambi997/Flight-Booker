import React from "react";
import arrow from "../icons/arrow.svg";
import { departureTimes, prices } from "../data/data";
import leftArrow from "../icons/left-arrow-chevron.svg";
import { colors } from "../data/style";
interface flightSelectorProps {
  label: string;
  origin: string;
  destination: string;
  departureDate: Date;
}

const FlightSelector = (props: flightSelectorProps) => {
  const { label, origin, destination, departureDate } = props;
  const [selectedTicket, setSelectedTicket] = React.useState<string>("");
  const [selectedDate, setSelectedDate] = React.useState<Date>(departureDate);
  return (
    <div
      style={{
        // width: "90%",
        margin: "10px",
        backgroundColor: "white",
        border: "1px solid lightgrey",
        boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.75)",
      }}
    >
      <div
        style={{
          backgroundColor: "lightgrey",
          padding: "10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <text
          style={{
            marginRight: "20px",
            textTransform: "uppercase",
          }}
        >
          {label}
        </text>
        <text
          style={{
            color: colors.primary,
            fontWeight: "bold",
          }}
        >
          {origin}
        </text>
        <img
          src={arrow}
          style={{
            height: "5px",
            paddingRight: "20px",
            paddingLeft: "20px",
          }}
          alt="arrow"
        />
        <text
          style={{
            color: colors.primary,
            fontWeight: "bold",
          }}
        >
          {destination}
        </text>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "50px",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => {
            setSelectedDate(new Date(selectedDate.getTime() - 86400000));
          }}
          style={{
            border: "none",
            backgroundColor: "transparent",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          <img
            src={leftArrow}
            style={{
              height: "10px",
              paddingRight: "10px",
              paddingLeft: "10px",
              rotate: "180deg",
            }}
            alt="arrow"
          />
          <text>
            {new Date(selectedDate.getTime() - 86400000).toLocaleDateString()}{" "}
          </text>
        </button>
        <text>{selectedDate.toLocaleDateString()}</text>
        <button
          onClick={() => {
            setSelectedDate(new Date(selectedDate.getTime() + 86400000));
          }}
          style={{
            border: "none",
            backgroundColor: "transparent",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          <text>
            {new Date(selectedDate.getTime() + 86400000).toLocaleDateString()}{" "}
          </text>
          <img
            src={leftArrow}
            style={{
              height: "10px",
              paddingRight: "20px",
              paddingLeft: "10px",
            }}
            alt="arrow"
          />
        </button>{" "}
      </div>
      <div>
        {departureTimes.map((time, index) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              height: "50px",
              alignItems: "center",
              border: "1px solid lightgrey",
              padding: "10px",
            }}
          >
            <div>
              <button
                onClick={() => {
                  // setSelectedTicket(time);
                }}
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                <text>
                  {time.departure}
                  <img
                    src={arrow}
                    style={{
                      height: "5px",
                      paddingRight: "20px",
                      paddingLeft: "20px",
                    }}
                    alt="arrow"
                  />
                  {time.arrival}
                </text>
              </button>
            </div>
            {prices.map((price, j) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  //   backgroundColor: j === 1 ? "lightgrey" : "white",
                }}
              >
                {index < 1 && (
                  <text
                    style={{
                      textTransform: "uppercase",
                      fontSize: "10px",
                    }}
                  >
                    <text>{price.name}</text>
                  </text>
                )}
                <button
                  onClick={() => {
                    setSelectedTicket(time.departure);
                  }}
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "center",
                      border: "2px solid red",
                      padding: "10px",
                      width: "100px",
                    }}
                  >
                    <text>${price.price}</text>
                  </div>
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightSelector;
