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
        } else {
          // Compare only the date parts (no time)
          const selected = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selected < today) {
            error = "Date cannot be in the past";
          }
        }
        break;
      case "time":
        if (!value) error = "Time is required";
        break;
      case "guests":
        // Ensure we validate numeric value
        if (value === "" || value === null || value === undefined) {
          error = "Number of guests is required";
        } else {
          const num = Number(value);
          if (Number.isNaN(num)) {
            error = "Number of guests must be a number";
          } else if (num < 1) {
            error = "Minimum 1 guest required";
          } else if (num > 10) {
            error = "Maximum 10 guests allowed";
          }
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
      // parse number input to keep consistent type
      [name]: name === "guests" ? (value === "" ? "" : Number(value)) : value,
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

  // Track whether a field has been touched (for nicer UX - only show errors after blur)
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Derived overall form validity
  const isFormValid = () => {
    // Validate all fields using current formData
    const errors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark form as submitted (so errors show if present)
    setSubmitted(true);
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);

    // Validate all fields
    const errors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) errors[key] = error;
    });

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Form is valid - call the submitForm function passed as prop
      submitForm(formData);
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
            onBlur={handleBlur}
            required
            min={new Date().toISOString().split("T")[0]}
            aria-invalid={!!formErrors.date}
          />
          {formErrors.date && (touched.date || submitted) && (
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
            onBlur={handleBlur}
            required
            aria-invalid={!!formErrors.time}
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
          {formErrors.time && (touched.time || submitted) && (
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
            onBlur={handleBlur}
            min="1"
            max="10"
            required
            aria-invalid={!!formErrors.guests}
          />
          {formErrors.guests && (touched.guests || submitted) && (
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
            onBlur={handleBlur}
            required
            aria-invalid={!!formErrors.occasion}
          >
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
          </select>
          {formErrors.occasion && (touched.occasion || submitted) && (
            <span className="error-message">{formErrors.occasion}</span>
          )}
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={!isFormValid()}
          aria-disabled={!isFormValid()}
          aria-label="On Click"
        >
          Reserve Table
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
