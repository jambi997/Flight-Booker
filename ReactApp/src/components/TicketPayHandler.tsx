import React, { useEffect } from "react";
import { SelectedTickets, Ticket } from "../types/generalTypes";
import { colors } from "../data/style";
import { days, months } from "../data/data";
import separatorWidthArrow from "../icons/Separator-with-Arrow.svg";
import ReactModal from "react-modal";
import { TicketSummary } from "./TicketSummary";
import TicketDetails from "./Ticket";

interface TicketPayHandlerProps {
  selectedTickets: SelectedTickets;
  resetTickets: () => void;
}

const ticketArraySorter = (tickets: SelectedTickets) => {
  let ttickets = Object.values(tickets);
  ttickets = ttickets.filter((ticket) => ticket !== null);
  return ttickets.sort((a: any, b: any) => {
    return a.departureDate - b.departureDate;
  });
};

const TicketPayHandler = (props: TicketPayHandlerProps) => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const { selectedTickets, resetTickets } = props;
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const [tickets, setTickets] = React.useState<Ticket[]>(
    ticketArraySorter(selectedTickets)
  );
  useEffect(() => {
    setTickets(ticketArraySorter(selectedTickets));
    const ttickets = Object.values(selectedTickets);
    let price = 0;
    for (let i in ttickets) {
      if (ttickets[i]) {
        price += ttickets[i]!.price;
      }
    }
    price = Math.round(price * 100) / 100;
    setTotalPrice(price);
  }, [selectedTickets]);

  return (
    <div>
      <div
        style={{
          backgroundColor: colors.text1,
          border: "1px solid lightgrey",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <div>FLIGHTS</div>
          <div>${totalPrice}</div>
        </div>
        <div>
          {tickets.map((ticket, index) => {
            return (
              <div key={index}>
                {index > 0 && (
                  <div>
                    <img
                      src={separatorWidthArrow}
                      style={{
                        width: "100%",
                        height: "20px",
                      }}
                    />
                  </div>
                )}
                <TicketDetails ticket={ticket} />
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: colors.primary,
          color: colors.text1,
          padding: "15px",
        }}
      >
        <div>TOTAL</div>
        <div>${totalPrice}</div>
      </div>
      <button
        disabled={totalPrice === 0}
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: totalPrice === 0 ? "gray" : colors.secondary,
          cursor: "pointer",
          border: "none",
          width: "100%",
          color: colors.text1,
          padding: "15px",
        }}
        onClick={() => {
          setModalOpen(true);
        }}
      >
        PAY NOW
      </button>
      <ReactModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "0px",
          },
        }}
      >
        <TicketSummary
          tickets={tickets}
          totalPrice={totalPrice}
          resetTickets={() => {
            resetTickets();
            setModalOpen(false);
          }}
        />
      </ReactModal>
    </div>
  );
};

export default TicketPayHandler;
