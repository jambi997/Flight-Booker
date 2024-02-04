import React from "react";
import TicketDetails from "./Ticket";
import { Ticket } from "../types/generalTypes";
import { colors } from "../data/style";

interface TicketSummaryProps {
  tickets: Ticket[];
  totalPrice: number;
  resetTickets: () => void;
}

export const TicketSummary = (props: TicketSummaryProps) => {
  const { tickets, totalPrice, resetTickets } = props;
  const reset = () => {
    resetTickets();
  };
  return (
    <div>
      <div
        style={{
          backgroundColor: colors.lightgray,
          padding: "25px",
          paddingBottom: "15px",
          paddingTop: "15px",
          color: colors.primary,
        }}
      >
        THANKS FOR BUYING YOUR TICKETS AT MITO AIRLINES
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          //   justifyContent: "center",
          padding: "20px",
        }}
      >
        {tickets.map((ticket: any, index: number) => (
          <TicketDetails ticket={ticket} key={index} />
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            display: "flex",
            gap: "5px",
          }}
        >
          TOTAL
          <div
            style={{
              color: colors.primary,
            }}
          >
            ${totalPrice}
          </div>
        </div>
        <button
          style={{
            textTransform: "uppercase",
            border: "none",
            backgroundColor: "transparent",
            color: colors.secondary,
            cursor: "pointer",
            //I want it to have underline
            textDecoration: "underline",
          }}
          onClick={reset}
        >
          no, thanks(reset)
        </button>
      </div>
    </div>
  );
};
