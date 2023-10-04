const initialState = {
  eventsList: [],
};

const EventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EVENTS_DATA":
      return {
        ...state,
        eventsList: action.payload,
      };
    default:
      return state;
  }
};

export default EventsReducer;
