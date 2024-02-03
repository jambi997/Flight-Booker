import React from "react";
import { colors } from "../data/style";
import Plus from "../icons/plusmito.svg";
import airplane from "../icons/airplane.svg";
import { useLocation } from "react-router-dom";
import { Location, SelectedTickets, Ticket } from "../types/generalTypes";
import FlightSelector from "../components/FlightSelector";
import TicketPayHandler from "../components/TicketPayHandler";

const SelectFlight = () => {
  const location: Location = useLocation();
  const { origin, destination, departureDate, returnDate } = location.state;
  const [selectedTickets, setSelectedTickets] = React.useState<SelectedTickets>(
    {}
  );

  const handleSelectTicket = (ticket: Ticket | null, type: string) => {
    setSelectedTickets({ ...selectedTickets, [type]: ticket });
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
            {returnDate && (
              <FlightSelector
                label="inbound"
                origin={destination}
                destination={origin}
                departureDate={returnDate}
                ticketType="returnTicket"
                handleSelectTicket={handleSelectTicket}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectFlight;
