import React, { useEffect } from "react";
import { SelectedTickets, Ticket } from "../types/generalTypes";
import { colors } from "../data/style";
import { days, months } from "../data/data";
import separatorWidthArrow from "../icons/Separator-with-Arrow.svg";
interface TicketPayHandlerProps {
  selectedTickets: SelectedTickets;
}

const ticketArraySorter = (tickets: SelectedTickets) => {
  let ttickets = Object.values(tickets);
  ttickets = ttickets.filter((ticket) => ticket !== null);
  return ttickets.sort((a: any, b: any) => {
    return a.departureDate - b.departureDate;
  });
};

const TicketPayHandler = (props: TicketPayHandlerProps) => {
  const { selectedTickets } = props;
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  //   const tickets = Object.values(selectedTickets);
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
          //   padding: "10px",
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
              <div>
                {index > 0 && (
                  <div
                    style={
                      {
                        // width: "100%",
                        // height: "1px",
                        // backgroundColor: "lightgrey",
                        // marginBottom: "10px",
                      }
                    }
                  >
                    <img
                      src={separatorWidthArrow}
                      style={{
                        width: "100%",
                        height: "20px",
                      }}
                    />
                  </div>
                )}
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingLeft: "10px",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // justifyContent: "space-between",
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
                      boxShadow: "0px 0px 1px 2px lightgrey",
                      width: "35px",
                      height: "50px",
                      // border: "1px solid lightgrey",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "lightgray",
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
                      {days[ticket?.departureDate?.getDay()]}{" "}
                      {ticket?.departureTime}
                      {" - "}
                      {ticket?.arrivalTime}
                    </div>
                  </div>
                </div>
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
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: colors.secondary,
          cursor: "pointer",
          border: "none",
          width: "100%",
          color: colors.text1,
          padding: "15px",
        }}
        onClick={() => {
          alert("PAYMENT SUCCESSFUL");
        }}
      >
        PAY NOW
      </button>
    </div>
  );
};

export default TicketPayHandler;
