const initialState = {
  eventsList: [],
  blogsList: [],
};

const EventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EVENTS_DATA":
      return {
        ...state,
        eventsList: action.payload,
      };
    case "SET_BLOGS_DATA":
      return {
        ...state,
        blogsList: action.payload,
      };
    default:
      return state;
  }
};

export default EventsReducer;
