import React from "react";
import { colors } from "../data/style";
import { days, months } from "../data/utils";

interface TicketProps {
  ticket: any;
}

const TicketDetails = (props: TicketProps) => {
  const { ticket } = props;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        paddingLeft: "10px",
        justifyContent: "space-between",
        alignItems: "center",
        // justifyContent: "space-between",
        marginRight: "20px",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          // padding: "2px",
          marginRight: "13px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textTransform: "uppercase",
          fontSize: "14px",
          boxShadow: `0px 0px 1px 2px ${colors.lightgray}`,
          width: "35px",
          height: "50px",
        }}
      >
        <div
          style={{
            backgroundColor: colors.lightgray,
            height: "50%",
            width: "100%",
            padding: "2px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {months[ticket?.departureDate?.getMonth()]}
        </div>
        <div
          style={{
            padding: "2px",
          }}
        >
          {ticket?.departureDate?.getDate()}
        </div>
      </div>
      <div>
        <div>
          {ticket?.origin} - {ticket?.destination}
        </div>
        <div
          style={{
            fontSize: "12px",
          }}
        >
          {days[ticket?.departureDate?.getDay()]} {ticket?.departureTime}
          {" - "}
          {ticket?.arrivalTime}
        </div>
      </div>
    </div>
  );
};

export default TicketDetails
