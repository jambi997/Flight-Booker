import React from "react";
import DestinationSelector from "../components/DestinationSelector";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        justifyItems: "center",
        height: "100vh",
      }}
    >
      <DestinationSelector />
    </div>
  );
};

export default Home;
