import {
  cities,
  departureTimes,
  prices,
} from "../data/data";

export const getCities = async () => {
  try {
    const response = await fetch("http://localhost:3000/cities"); // Assuming the endpoint is /cities
    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }
    //   const data = await response.json();
    const data = cities;
    return data;
  } catch (error) {
    console.error("Error fetching cities: ", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const getTicketPrices = async () => {
  try {
    const response = await fetch("http://localhost:3000/prices"); // Assuming the endpoint is /prices
    if (!response.ok) {
      throw new Error("Failed to fetch prices");
    }
    //   const data = await response.json();
    const data = {
      prices: prices,
      departureTimes: departureTimes,
    };
    return data;
  } catch (error) {
    console.error("Error fetching prices: ", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
