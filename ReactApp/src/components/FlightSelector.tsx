import React, { useEffect } from "react";
import arrow from "../icons/arrow.svg";
import leftArrow from "../icons/left-arrow-chevron.svg";
import { colors } from "../data/style";
import { FlightData, SelectedTickets, Ticket } from "../types/generalTypes";
import FlightSelectorTop from "./FlightSelectorTop";
import { isMobile } from "react-device-detect";
import { days, fullDays, fullMonths } from "../data/utils";

interface flightSelectorProps {
  label: string;
  origin: string;
  destination: string;
  departureDate: Date;
  selectedTickets: SelectedTickets;
  flightData: FlightData | null;
  minDate: Date;
  setDate?: (date: Date) => void;
  handleSelectTicket: (ticket: Ticket | null, type: string) => void;
  ticketType: "departureTicket" | "returnTicket";
}

const basicDate = (date: Date) => {
  return `${days[date.getDay()]}, ${date.getDate()} ${
    fullMonths[date.getMonth()]
  }`;
};

const FlightSelector = (props: flightSelectorProps) => {
  const {
    label,
    origin,
    destination,
    departureDate,
    handleSelectTicket,
    flightData,
    minDate,
    selectedTickets,
    setDate,
    ticketType,
  } = props;

  const { departureTimes, prices } = flightData || {
    departureTimes: [],
    prices: [],
  };
  const [selectedTicket, setSelectedTicket] = React.useState<Ticket | null>(
    null
  );
  const [selectedDate, setSelectedDate] = React.useState<Date>(departureDate);
  const handleTicketSelection = (ticket: Ticket | null) => {
    selectedTicket?.id === ticket?.id
      ? setSelectedTicket(null)
      : setSelectedTicket(ticket);
  };

  useEffect(() => {
    let tticket = null;
    if (selectedTicket) {
      tticket = {
        ...selectedTicket,
        departureDate: selectedDate,
      };
    }
    handleSelectTicket(tticket, ticketType);
  }, [selectedTicket, selectedDate]);

  useEffect(() => {
    if (!selectedTickets[ticketType]) {
      setSelectedTicket(null);
    }
  }, [selectedTickets]);

  useEffect(() => {
    if (selectedDate.getTime() < minDate.getTime()) {
      setSelectedDate(departureDate);
    }
  }, [departureDate]);

  return (
    <div
      style={{
        // width: "90%",
        marginBottom: "30px",
        backgroundColor: "white",
        border: "1px solid lightgrey",
        boxShadow: "0px 0px 1px 0px rgba(0,0,0,0.75)",
      }}
    >
      <FlightSelectorTop
        label={label}
        origin={origin}
        destination={destination}
      />
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "5px",
          justifyContent: "space-between",
          // minHeight: "50px",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => {
            if (selectedDate.getTime() - 86400000 >= minDate.getTime()) {
              setSelectedDate(new Date(selectedDate.getTime() - 86400000));
              setDate && setDate(new Date(selectedDate.getTime() - 86400000));
            }
          }}
          style={{
            border: "none",
            backgroundColor: "transparent",
            textTransform: "uppercase",
            cursor: "pointer",
            display: "flex",
            opacity:
              selectedDate.getTime() - 86400000 < minDate.getTime() ? 0.6 : 1,
            alignItems: "center",
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
          <div
            style={{
              color: colors.gray,
              fontSize: "13px",
              lineHeight: "15.23px",
            }}
          >
            {basicDate(new Date(selectedDate.getTime() - 86400000))}{" "}
          </div>
        </button>
        <div>
          {/* {selectedDate.toLocaleDateString()} */}
          {fullDays[selectedDate.getDay()]}
          {", "}
          {selectedDate.getDate()} {fullMonths[selectedDate.getMonth()]}{" "}
          {selectedDate.getFullYear()}
        </div>
        <button
          onClick={() => {
            setSelectedDate(new Date(selectedDate.getTime() + 86400000));
            setDate && setDate(new Date(selectedDate.getTime() + 86400000));
          }}
          style={{
            border: "none",
            backgroundColor: "transparent",
            textTransform: "uppercase",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: colors.gray,
              fontSize: "13px",
              lineHeight: "15.23px",
            }}
          >
            {basicDate(new Date(selectedDate.getTime() + 86400000))}{" "}
          </div>
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
      <div
        style={{
          display: isMobile ? "grid" : "flex",
          gridTemplateColumns: "1fr 1fr",
          flexDirection: isMobile ? "row" : "column",
          minHeight: "200px",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        {departureTimes.map((time, i) => (
          <div
            key={`i${i}`}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
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
                </div>
              </button>
            </div>
            {prices.map((price, j) => (
              <div
                key={`j${j}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: j === 1 ? "lightgrey" : "white",
                }}
              >
                {(i < 1 || isMobile) && (
                  <div
                    style={{
                      textTransform: "uppercase",
                      fontSize: "10px",
                    }}
                  >
                    <div>{price.name}</div>
                  </div>
                )}
                <button
                  className="hover"
                  onClick={() => {
                    handleTicketSelection({
                      origin: origin,
                      destination: destination,
                      departureDate: selectedDate,
                      departureTime: time.departure,
                      arrivalTime: time.arrival,
                      price: price.price,
                      id: `${i}${j}`,
                    });
                  }}
                  style={{
                    border: "none",
                    textTransform: "uppercase",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      color:
                        `${i}${j}` === selectedTicket?.id
                          ? colors.text1
                          : colors.text2,
                      backgroundColor:
                        `${i}${j}` === selectedTicket?.id
                          ? colors.secondary
                          : "transparent",
                      alignItems: "center",
                      border: `2px solid ${colors.secondary}`,
                      padding: "10px",
                      width: "100px",
                    }}
                  >
                    <div>${price.price}</div>
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
