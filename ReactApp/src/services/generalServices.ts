import { cities, departureTimes, prices } from "../data/data";
import { FlightData } from "../types/generalTypes";

export const getCities = async () => {
  try {
    const response = await fetch("http://localhost:3000/cities");
    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }
    const data = cities;
    return data;
  } catch (error) {
    console.error("Error fetching cities: ", error);
    throw error;
  }
};

export const getTicketPrices = async () => {
  try {
    const response = await fetch("http://localhost:3000/prices");
    if (!response.ok) {
      throw new Error("Failed to fetch prices");
    }
    const data: FlightData = {
      prices: prices,
      departureTimes: departureTimes,
      expiredTicketIds: [1, 32],
    };
    return data;
  } catch (error) {
    console.error("Error fetching prices: ", error);
    throw error;
  }
};
