import React, { useReducer } from "react";
import Nav from "./Nav";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { updateTimes, initializeTimes } from "../reducers/bookingReducer";
import "../App.css";

const Homepage = () => {
  // Initialize booking times state using reducer
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());

  // Handler for date changes
  const handleDateChange = (date) => {
    dispatch({ type: "UPDATE_TIMES", payload: date });
  };

  return (
    <div className="app-grid">
      <Nav />
      <Header />
      <Main availableTimes={availableTimes} onDateChange={handleDateChange} />
      <Footer />
    </div>
  );
};

export default Homepage;
