export const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES":
      // Use fetchAPI to get available times for the selected date
      const selectedDate = action.payload;
      if (selectedDate && window.fetchAPI) {
        try {
          const availableTimes = window.fetchAPI(selectedDate);
          return availableTimes;
        } catch (error) {
          console.error("Error fetching available times:", error);
          return state; // Return current state if API call fails
        }
      }
      return state;
    default:
      return state;
  }
};

export const initializeTimes = () => {
  // Use fetchAPI to get available times for today's date
  if (window.fetchAPI) {
    try {
      const today = new Date();
      const todayString = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      const availableTimes = window.fetchAPI(todayString);
      return availableTimes;
    } catch (error) {
      console.error("Error fetching initial times:", error);
      // Fallback to default times if API call fails
      return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    }
  }
  // Fallback if API is not available
  return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
};
