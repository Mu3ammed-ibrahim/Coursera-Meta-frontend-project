import React, { useState } from "react";
import "./BookingForm.css";

const BookingForm = ({ availableTimes, onDateChange, submitForm }) => {
  // Initialize form state
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: 1,
    occasion: "Birthday",
  });

  // Initialize form validation state
  const [formErrors, setFormErrors] = useState({});

  // Validate form fields
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "date":
        if (!value) {
          error = "Date is required";
        } else if (new Date(value) < new Date().setHours(0, 0, 0, 0)) {
          error = "Date cannot be in the past";
        }
        break;
      case "time":
        if (!value) error = "Time is required";
        break;
      case "guests":
        if (!value) {
          error = "Number of guests is required";
        } else if (value < 1) {
          error = "Minimum 1 guest required";
        } else if (value > 10) {
          error = "Maximum 10 guests allowed";
        }
        break;
      case "occasion":
        if (!value) error = "Occasion is required";
        break;
      default:
        break;
    }
    return error;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // If date changes, update available times
    if (name === "date") {
      onDateChange(value);
    }

    // Validate field
    const error = validateField(name, value);
    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const errors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    if (Object.keys(errors).length === 0) {
      // Form is valid - call the submitForm function passed as prop
      submitForm(formData);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="booking-form-container">
      <form onSubmit={handleSubmit} className="booking-form">
        <h2>Reserve a Table</h2>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]}
          />
          {formErrors.date && (
            <span className="error-message">{formErrors.date}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="time">Time</label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">Select a time</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {new Date(`2023-01-01T${time}`).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </option>
            ))}
          </select>
          {formErrors.time && (
            <span className="error-message">{formErrors.time}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="guests">Number of Guests</label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
          {formErrors.guests && (
            <span className="error-message">{formErrors.guests}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
            required
          >
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
          </select>
          {formErrors.occasion && (
            <span className="error-message">{formErrors.occasion}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
          Reserve Table
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
