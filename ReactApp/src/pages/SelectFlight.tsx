import React from "react";
import { colors } from "../data/style";
import Plus from "../icons/plusmito.svg";
import airplane from "../icons/airplane.svg";
import { useLocation } from "react-router-dom";
import { Location, SelectedTickets, Ticket } from "../types/generalTypes";
import FlightSelector from "../components/FlightSelector";
import TicketPayHandler from "../components/TicketPayHandler";
import arrow from "../icons/arrow.svg";
import FlightSelectorTop from "../components/FlightSelectorTop";
import DateSelector from "../components/DateSelector";
import SubmitButton from "../components/SubmitButton";

const SelectFlight = () => {
  const location: Location = useLocation();
  const storedData = localStorage.getItem("bookValues");
  const parsedData = storedData ? JSON.parse(storedData) : null;
  console.log(location);
  // const { origin, destination, departureDate, returnDate } = location.state;
  const { origin, destination } = parsedData;
  const departureDate = new Date(parsedData.departureDate);
  const [returnDate, setReturnDate] = React.useState<Date | null>(
    parsedData.returnDate ? new Date(parsedData.returnDate) : null
  );
  const [tempReturnDate, setTempReturnDate] = React.useState<Date | null>(null);
  // const returnDate = parsedData.returnDate
  //   ? new Date(parsedData.returnDate)
  //   : null;
  const [selectedTickets, setSelectedTickets] = React.useState<SelectedTickets>(
    {}
  );

  const handleSelectTicket = (ticket: Ticket | null, type: string) => {
    setSelectedTickets({ ...selectedTickets, [type]: ticket });
  };

  const changeReturnDate = (value: Date) => {
    console.log(value);
    // setReturnDate(value);
    setTempReturnDate(value);
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
            paddingLeft: "100px",
          }}
        >
          {origin} - {destination}
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
            display: "grid",
            gridTemplateColumns: "1fr 4fr",
            width: "95vw",
            maxWidth: "1050px",
            padding: "10px",
            margin: "10px",
            //spacing
            columnGap: "20px",
          }}
        >
          <div>
            <TicketPayHandler selectedTickets={selectedTickets} />
          </div>
          <div>
            <FlightSelector
              label="outbound"
              origin={origin}
              destination={destination}
              departureDate={departureDate}
              ticketType="departureTicket"
              handleSelectTicket={handleSelectTicket}
            />
            {returnDate ? (
              <FlightSelector
                label="inbound"
                origin={destination}
                destination={origin}
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
