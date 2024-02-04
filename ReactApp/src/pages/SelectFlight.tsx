import React from "react";
import { colors } from "../data/style";
import Plus from "../icons/plusmito.svg";
import airplane from "../icons/airplane.svg";
import { useLocation } from "react-router-dom";
import { Location, SelectedTickets, Ticket } from "../types/generalTypes";
import FlightSelector from "../components/FlightSelector";
import TicketPayHandler from "../components/TicketPayHandler";
// import arrow from "../icons/arrow.svg";
import whitearrow from "../icons/whitearrow.svg";
import FlightSelectorTop from "../components/FlightSelectorTop";
import DateSelector from "../components/DateSelector";
import SubmitButton from "../components/SubmitButton";
import { isMobile } from "react-device-detect";

const SelectFlight = () => {
  const storedData = localStorage.getItem("bookValues");
  const parsedData = storedData ? JSON.parse(storedData) : null;
  const { origin, destination } = parsedData;
  const departureDate = new Date(parsedData.departureDate);
  const [returnDate, setReturnDate] = React.useState<Date | null>(
    parsedData.returnDate ? new Date(parsedData.returnDate) : null
  );
  console.log("returnDate", returnDate);
  const [tempReturnDate, setTempReturnDate] = React.useState<Date | null>(null);
  const [selectedTickets, setSelectedTickets] = React.useState<SelectedTickets>(
    {}
  );

  const handleSelectTicket = (ticket: Ticket | null, type: string) => {
    setSelectedTickets({ ...selectedTickets, [type]: ticket });
  };

  const resetTickets = () => {
    setSelectedTickets({});
  };

  const changeReturnDate = (value: Date) => {
    setTempReturnDate(value);
    localStorage.setItem(
      "bookValues",
      JSON.stringify({ ...parsedData, returnDate: value })
    );
  };
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
          // width: "100wv",
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
            paddingLeft: isMobile ? "20px" : "100px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                marginRight: "20px",
                fontSize: "10px",
                textTransform: "uppercase",
              }}
            >
              leaving from
            </div>
            {origin}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {!returnDate ? (
              <img
                src={whitearrow}
                style={{
                  height: "5px",
                  paddingRight: "20px",
                  paddingLeft: "20px",
                }}
                alt="arrow"
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <img
                  src={whitearrow}
                  style={{
                    height: "5px",
                    paddingRight: "20px",
                    paddingLeft: "20px",
                  }}
                  alt="arrow"
                />
                <img
                  src={whitearrow}
                  style={{
                    height: "5px",
                    paddingRight: "20px",
                    paddingLeft: "20px",
                    rotate: "180deg",
                  }}
                  alt="arrow"
                />
              </div>
            )}
          </div>
          <div
            style={{
              height: "100%",
              // width: "100%",
              display: "flex",
              alignItems: "end",
            }}
          >
            {destination}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
            display: isMobile ? "block" : "grid",
            gridTemplateColumns: isMobile ? "auto" : "1fr 4fr",
            // flexDirection: "column",
            // width: "95vw",
            maxWidth: "1050px",
            padding: "10px",
            margin: "10px",
            columnGap: "20px",
          }}
        >
          <div>
            <TicketPayHandler
              selectedTickets={selectedTickets}
              resetTickets={resetTickets}
            />
          </div>
          <div>
            <FlightSelector
              label="outbound"
              origin={origin}
              destination={destination}
              selectedTickets={selectedTickets}
              departureDate={departureDate}
              ticketType="departureTicket"
              handleSelectTicket={handleSelectTicket}
            />
            {returnDate ? (
              <FlightSelector
                label="inbound"
                origin={destination}
                destination={origin}
                selectedTickets={selectedTickets}
                departureDate={returnDate}
                ticketType="returnTicket"
                handleSelectTicket={handleSelectTicket}
              />
            ) : (
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
                  label="inbound"
                  origin={destination}
                  destination={origin}
                />
                <div
                  style={{
                    padding: "30px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <DateSelector
                      name="returnDate"
                      value={tempReturnDate}
                      onChange={(value) => changeReturnDate(value)}
                    />
                  </div>
                  <div
                    style={{
                      width: "100px",
                    }}
                  >
                    <SubmitButton
                      label="Search"
                      onClick={() => {
                        setReturnDate(tempReturnDate);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectFlight;
