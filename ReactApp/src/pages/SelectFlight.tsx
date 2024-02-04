import React, { useEffect } from "react";
import { colors } from "../data/style";
import Plus from "../icons/plusmito.svg";
import airplane from "../icons/airplane.svg";
import { useLocation } from "react-router-dom";
import {
  FlightData,
  Location,
  SelectedTickets,
  Ticket,
} from "../types/generalTypes";
import FlightSelector from "../components/FlightSelector";
import TicketPayHandler from "../components/TicketPayHandler";
// import arrow from "../icons/arrow.svg";
import whitearrow from "../icons/whitearrow.svg";
import FlightSelectorTop from "../components/FlightSelectorTop";
import DateSelector from "../components/DateSelector";
import SubmitButton from "../components/SubmitButton";
import { isMobile } from "react-device-detect";
import { getTicketPrices } from "../services/generalServices";

const SelectFlight = () => {
  const storedData = localStorage.getItem("bookValues");
  !storedData && window.location.replace("/");
  const parsedData = storedData ? JSON.parse(storedData) : null;

  (parsedData.origin === "" ||
    parsedData.destination === "" ||
    parsedData.departureDate === "") &&
    window.location.replace("/");

  const [flightData, setFlightData] = React.useState<FlightData | null>(null);
  const { origin, destination } = parsedData;
  const [departureDate, setDepartureDate] = React.useState<Date>(
    parsedData.departureDate ? new Date(parsedData.departureDate) : new Date()
  );
  const [returnDate, setReturnDate] = React.useState<Date | null>(
    parsedData.returnDate ? new Date(parsedData.returnDate) : null
  );
  const [tempReturnDate, setTempReturnDate] = React.useState<Date | null>(null);
  const [selectedTickets, setSelectedTickets] = React.useState<SelectedTickets>(
    {}
  );
  const [returnError, setReturnError] = React.useState<string>("");

  const handleSelectTicket = (ticket: Ticket | null, type: string) => {
    setSelectedTickets({ ...selectedTickets, [type]: ticket });
    if (ticket?.origin === origin && ticket?.departureDate) {
      setDepartureDate(new Date(ticket.departureDate));
    }
    if (ticket?.origin === destination && ticket?.departureDate) {
      setReturnDate(new Date(ticket.departureDate));
    }
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

  useEffect(() => {
    if (returnDate && new Date(returnDate) <= new Date(departureDate)) {
      setReturnDate(new Date(departureDate.getTime() + 24 * 60 * 60 * 1000));
    }
  }, [departureDate, returnDate]);

  useEffect(() => {
    if (
      tempReturnDate &&
      new Date(tempReturnDate.getTime() - 8604000) < new Date(departureDate)
    ) {
      setReturnError("Return date must be after departure");
    } else {
      setReturnError("");
    }
  }, [tempReturnDate]);

  useEffect(() => {
    const getData = async () => {
      const priceData = await getTicketPrices();

      setFlightData(priceData);
    };
    getData();
  }, []);

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
              flightData={flightData}
              minDate={new Date()}
              departureDate={departureDate}
              setDate={setDepartureDate}
              ticketType="departureTicket"
              handleSelectTicket={handleSelectTicket}
            />
            {returnDate ? (
              <FlightSelector
                label="inbound"
                origin={destination}
                flightData={flightData}
                destination={origin}
                selectedTickets={selectedTickets}
                minDate={
                  new Date(departureDate.getTime() + 24 * 60 * 60 * 1000)
                }
                setDate={setReturnDate}
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
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <DateSelector
                      name="returnDate"
                      value={tempReturnDate}
                      onChange={(value) => changeReturnDate(value)}
                      label="Return"
                      error={returnError}
                    />
                  </div>
                  <div
                    style={{
                      width: "100px",
                      marginTop: "-30px",
                    }}
                  >
                    <SubmitButton
                      label="Search"
                      disabled={returnError !== ""}
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
