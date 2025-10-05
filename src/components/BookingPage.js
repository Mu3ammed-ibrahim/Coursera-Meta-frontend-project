import React, { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm";
import Nav from "./Nav";
import { updateTimes, initializeTimes } from "../reducers/bookingReducer";

const BookingPage = () => {
  const navigate = useNavigate();
  
  // Initialize times reducer
  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());

  // Handler for date changes
  const handleDateChange = (date) => {
    dispatch({ type: "UPDATE_TIMES", payload: date });
  };

  // Function to submit the form
  const submitForm = (formData) => {
    if (window.submitAPI) {
      try {
        const success = window.submitAPI(formData);
        if (success) {
          // Navigate to booking confirmation page
          navigate("/booking-confirmed");
        } else {
          alert("Failed to submit booking. Please try again.");
        }
      } catch (error) {
        console.error("Error submitting booking:", error);
        alert("Failed to submit booking. Please try again.");
      }
    } else {
      // Fallback if API is not available
      console.log("Form submitted:", formData);
      alert("Booking submitted successfully!");
      navigate("/booking-confirmed");
    }
  };

  return (
    <>
      <div className="booking-page">
        <Nav />
        <div className="booking-content">
          <BookingForm
            availableTimes={availableTimes}
            onDateChange={handleDateChange}
            submitForm={submitForm}
          />
        </div>
      </div>
    </>
  );
};

export default BookingPage;