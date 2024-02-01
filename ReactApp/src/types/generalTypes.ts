export interface BookValues {
  origin: string;
  destination: string;
  departureDate: Date;
  returnDate?: Date | null;
}

export interface Location {
    state: BookValues;
}
