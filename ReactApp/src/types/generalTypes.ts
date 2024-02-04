export interface BookValues {
  origin: string;
  destination: string;
  departureDate: Date | null;
  returnDate?: Date | null;
}

export interface Location {
  state: BookValues;
}

export interface Ticket {
  origin: string;
  destination: string;
  departureDate: Date;
  departureTime: string;
  arrivalTime: string;
  price: number;
  id: string;
}

export interface departureTime {
  departure: string;
  arrival: string;
}

export interface Price {
  name: string;
  price: number;
}

export interface FlightData {
  departureTimes: departureTime[];
  prices: Price[];
}

export interface SelectedTickets {
  departureTicket?: Ticket | null;
  returnTicket?: Ticket | null;
}
