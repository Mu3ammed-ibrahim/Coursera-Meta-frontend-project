import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage";
import BookingPage from "./components/BookingPage";
import ConfirmedBooking from "./components/ConfirmedBooking";
// import About from "./components/About";
// import Menu from "./components/Menu";
// import Reservations from "./components/Reservations";
// import Order from "./components/Order";
// import Login from "./components/Login";
import "./App.css";
function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/order" element={<BookingPage />}></Route>
          <Route path="/booking-confirmed" element={<ConfirmedBooking />} />
          {/* <Route path="/reservations" element={<BookingPage />} /> */}
{/*
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} /> */}
        </Routes>
      </>
    </Router>
  );
}

export default App;