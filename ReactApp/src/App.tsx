import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import SelectFlight from "./pages/SelectFlight";
import europe from "./icons/europe.svg";
function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${europe})`,
        backgroundSize: "cover",
        height: "100%",
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<SelectFlight />} />
      </Routes>
    </div>
  );
}

export default App;
