import React from "react";
import { useNavigate } from "react-router-dom";

const ConfirmedBooking = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="confirmed-booking-container">
      <div className="confirmed-booking-content">
        <div className="success-icon">✓</div>
        <h1>Booking Confirmed!</h1>
        <p className="confirmation-message">
          Thank you for choosing Little Lemon! Your table reservation has been successfully confirmed.
        </p>
        <p className="additional-info">
          You will receive a confirmation email shortly with all the details of your reservation.
        </p>
        <button className="btn return-home-btn" onClick={handleReturnHome}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmedBooking;