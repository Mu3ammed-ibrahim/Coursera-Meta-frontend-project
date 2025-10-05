import { render, screen } from "@testing-library/react";
import BookingForm from "../BookingForm";

describe("BookingForm", () => {
  const mockProps = {
    availableTimes: ["17:00", "18:00", "19:00"],
    onDateChange: jest.fn(),
  };

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

  test("renders submit button", () => {
    render(<BookingForm {...mockProps} />);
    const submitButton = screen.getByRole("button", { name: /reserve table/i });
    expect(submitButton).toBeInTheDocument();
});
});
