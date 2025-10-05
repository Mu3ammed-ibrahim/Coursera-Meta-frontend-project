import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BookingForm from "./components/BookingForm";
import App from "./App";
import { updateTimes, initializeTimes } from "./reducers/bookingReducer";

describe("BookingForm", () => {
  const mockOnDateChange = jest.fn();
  const mockSubmitForm = jest.fn();
  const mockAvailableTimes = [
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Renders the static text heading", () => {
    render(
      <BrowserRouter>
        <BookingForm
          availableTimes={mockAvailableTimes}
          onDateChange={mockOnDateChange}
          submitForm={mockSubmitForm}
        />
      </BrowserRouter>
    );
    const headingElement = screen.getByText("Reserve a Table");
    expect(headingElement).toBeInTheDocument();
  });

  test("Form can be filled out and submitted", () => {
    render(
      <BrowserRouter>
        <BookingForm
          availableTimes={mockAvailableTimes}
          onDateChange={mockOnDateChange}
          submitForm={mockSubmitForm}
        />
      </BrowserRouter>
    );

    // Fill out the form
    const dateInput = screen.getByLabelText(/Date/);
    fireEvent.change(dateInput, { target: { value: "2023-10-30" } });

    const timeInput = screen.getByLabelText(/Time/);
    fireEvent.change(timeInput, { target: { value: "17:00" } });

    const guestsInput = screen.getByLabelText(/Number of guests/);
    fireEvent.change(guestsInput, { target: { value: "2" } });

    const occasionInput = screen.getByLabelText(/Occasion/);
    fireEvent.change(occasionInput, { target: { value: "Birthday" } });

    // Submit the form
    const submitButton = screen.getByRole("button", {
      name: /Reserve Table/i,
    });
    fireEvent.click(submitButton);

    // Verify that submitForm was called with the correct data
    expect(mockSubmitForm).toHaveBeenCalledWith({
      date: "2023-10-30",
      time: "17:00",
      guests: "2",
      occasion: "Birthday",
    });
  });

  test("Calls onDateChange when date is changed", () => {
    render(
      <BrowserRouter>
        <BookingForm
          availableTimes={mockAvailableTimes}
          onDateChange={mockOnDateChange}
          submitForm={mockSubmitForm}
        />
      </BrowserRouter>
    );

    const dateInput = screen.getByLabelText(/Date/);
    fireEvent.change(dateInput, { target: { value: "2023-10-30" } });

    expect(mockOnDateChange).toHaveBeenCalledWith("2023-10-30");
  });
});

// Test reducer functions
describe("Booking Reducer Tests", () => {
  // Mock fetchAPI function
  const mockFetchAPI = jest.fn();

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    // Reset window.fetchAPI
    delete window.fetchAPI;
  });

  afterEach(() => {
    // Clean up after each test
    delete window.fetchAPI;
  });

  test("initializeTimes returns API data when fetchAPI is available", () => {
    // Arrange
    const mockApiTimes = ["17:30", "18:30", "19:30", "20:30", "21:30"];
    window.fetchAPI = mockFetchAPI;
    mockFetchAPI.mockReturnValue(mockApiTimes);

    // Act
    const initialTimes = initializeTimes();

    // Assert
    expect(mockFetchAPI).toHaveBeenCalledTimes(1);
    expect(mockFetchAPI).toHaveBeenCalledWith(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
    ); // YYYY-MM-DD format
    expect(initialTimes).toEqual(mockApiTimes);
  });

  test("initializeTimes returns fallback times when fetchAPI is not available", () => {
    // Arrange - window.fetchAPI is undefined
    const expectedFallbackTimes = [
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
    ];

    // Act
    const initialTimes = initializeTimes();

    // Assert
    expect(initialTimes).toEqual(expectedFallbackTimes);
  });

  test("initializeTimes returns fallback times when fetchAPI throws an error", () => {
    // Arrange
    window.fetchAPI = mockFetchAPI;
    mockFetchAPI.mockImplementation(() => {
      throw new Error("API Error");
    });
    const expectedFallbackTimes = [
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
    ];

    // Act
    const initialTimes = initializeTimes();

    // Assert
    expect(mockFetchAPI).toHaveBeenCalledTimes(1);
    expect(initialTimes).toEqual(expectedFallbackTimes);
  });

  test("updateTimes returns API data when fetchAPI is available and date is provided", () => {
    // Arrange
    const currentState = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    const selectedDate = "2024-01-15";
    const mockApiTimes = ["17:30", "18:30", "19:30", "20:30"];
    window.fetchAPI = mockFetchAPI;
    mockFetchAPI.mockReturnValue(mockApiTimes);

    // Act
    const newState = updateTimes(currentState, {
      type: "UPDATE_TIMES",
      payload: selectedDate,
    });

    // Assert
    expect(mockFetchAPI).toHaveBeenCalledTimes(1);
    expect(mockFetchAPI).toHaveBeenCalledWith(selectedDate);
    expect(newState).toEqual(mockApiTimes);
  });

  test("updateTimes returns current state when fetchAPI is not available", () => {
    // Arrange
    const currentState = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    const selectedDate = "2024-01-15";
    // window.fetchAPI is undefined

    // Act
    const newState = updateTimes(currentState, {
      type: "UPDATE_TIMES",
      payload: selectedDate,
    });

    // Assert
    expect(newState).toEqual(currentState);
  });

  test("updateTimes returns current state when no date is provided", () => {
    // Arrange
    const currentState = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    window.fetchAPI = mockFetchAPI;
    mockFetchAPI.mockReturnValue(["17:30", "18:30"]);

    // Act
    const newState = updateTimes(currentState, {
      type: "UPDATE_TIMES",
      payload: null,
    });

    // Assert
    expect(mockFetchAPI).not.toHaveBeenCalled();
    expect(newState).toEqual(currentState);
  });

  test("updateTimes returns current state when fetchAPI throws an error", () => {
    // Arrange
    const currentState = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    const selectedDate = "2024-01-15";
    window.fetchAPI = mockFetchAPI;
    mockFetchAPI.mockImplementation(() => {
      throw new Error("API Error");
    });

    // Act
    const newState = updateTimes(currentState, {
      type: "UPDATE_TIMES",
      payload: selectedDate,
    });

    // Assert
    expect(mockFetchAPI).toHaveBeenCalledTimes(1);
    expect(mockFetchAPI).toHaveBeenCalledWith(selectedDate);
    expect(newState).toEqual(currentState);
  });

  test("updateTimes returns same state with invalid action type", () => {
    // Arrange
    const currentState = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

    // Act
    const newState = updateTimes(currentState, { type: "INVALID_ACTION" });

    // Assert
    expect(newState).toEqual(currentState);
  });
});

// Keep a basic App test
test("App renders without crashing", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getByRole("banner")).toBeInTheDocument();
});
