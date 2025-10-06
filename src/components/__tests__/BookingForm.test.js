import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "../BookingForm";

describe("BookingForm", () => {
  const mockProps = {
    availableTimes: ["17:00", "18:00", "19:00"],
    onDateChange: jest.fn(),
    submitForm: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  test("renders the booking form heading", () => {
    render(<BookingForm {...mockProps} />);
    const headingElement = screen.getByRole("heading", {
      name: /reserve a table/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  test("renders all form labels", () => {
    render(<BookingForm {...mockProps} />);
    const dateLabel = screen.getByLabelText(/date/i);
    const timeLabel = screen.getByLabelText(/time/i);
    const guestsLabel = screen.getByLabelText(/number of guests/i);
    const occasionLabel = screen.getByLabelText(/occasion/i);

    expect(dateLabel).toBeInTheDocument();
    expect(timeLabel).toBeInTheDocument();
    expect(guestsLabel).toBeInTheDocument();
    expect(occasionLabel).toBeInTheDocument();
  });

  test("renders submit button and it's initially disabled when form incomplete", () => {
    render(<BookingForm {...mockProps} />);
    const submitButton = screen.getByRole("button", { name: /reserve table/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test("date input has required and min attributes", () => {
    render(<BookingForm {...mockProps} />);
    const dateInput = screen.getByLabelText(/date/i);
    const expectedMin = new Date().toISOString().split("T")[0];
    expect(dateInput).toHaveAttribute("required");
    expect(dateInput).toHaveAttribute("min", expectedMin);
  });

  test("guests input has number type, min, max, and required attributes", () => {
    render(<BookingForm {...mockProps} />);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    expect(guestsInput).toHaveAttribute("type", "number");
    expect(guestsInput).toHaveAttribute("min", "1");
    expect(guestsInput).toHaveAttribute("max", "10");
    expect(guestsInput).toHaveAttribute("required");
  });

  test("time and occasion selects are required", () => {
    render(<BookingForm {...mockProps} />);
    const timeSelect = screen.getByLabelText(/time/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    expect(timeSelect).toHaveAttribute("required");
    expect(occasionSelect).toHaveAttribute("required");
  });

  test("shows validation errors for empty fields on blur", () => {
    render(<BookingForm {...mockProps} />);
    const dateInput = screen.getByLabelText(/date/i);
    const timeSelect = screen.getByLabelText(/time/i);

    // Blur without entering a value should show 'required' errors
    fireEvent.blur(dateInput);
    fireEvent.blur(timeSelect);

    expect(screen.getByText(/date is required/i)).toBeInTheDocument();
    expect(screen.getByText(/time is required/i)).toBeInTheDocument();
  });

  test("guests validation: invalid and valid states", () => {
    render(<BookingForm {...mockProps} />);
    const guestsInput = screen.getByLabelText(/number of guests/i);

    // invalid: 0 guests
    fireEvent.change(guestsInput, { target: { value: "0" } });
    fireEvent.blur(guestsInput);
    expect(screen.getByText(/minimum 1 guest required/i)).toBeInTheDocument();

    // valid: 2 guests
    fireEvent.change(guestsInput, { target: { value: "2" } });
    fireEvent.blur(guestsInput);
    expect(
      screen.queryByText(/minimum 1 guest required/i)
    ).not.toBeInTheDocument();
  });

  test("calls submitForm when form is valid", () => {
    render(<BookingForm {...mockProps} />);
    const dateInput = screen.getByLabelText(/date/i);
    const timeSelect = screen.getByLabelText(/time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    const submitButton = screen.getByRole("button", { name: /reserve table/i });

    const today = new Date().toISOString().split("T")[0];

    // Fill valid values
    fireEvent.change(dateInput, { target: { value: today } });
    fireEvent.change(timeSelect, { target: { value: "17:00" } });
    fireEvent.change(guestsInput, { target: { value: "2" } });
    fireEvent.change(occasionSelect, { target: { value: "Birthday" } });

    // Now the form should be valid and button enabled
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    expect(mockProps.submitForm).toHaveBeenCalledTimes(1);
    expect(mockProps.submitForm).toHaveBeenCalledWith({
      date: today,
      time: "17:00",
      guests: 2,
      occasion: "Birthday",
    });
  });
});
