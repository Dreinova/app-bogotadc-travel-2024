// languageReducer.js
const initialState = {
  language: "es",
  words: [],
};

const languageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };
    case "GET_ALL_WORDS_LANGUAGE":
      return {
        ...state,
        words: action.payload,
      };
    default:
      return state;
  }
};

export default languageReducer;
