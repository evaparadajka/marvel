const initialState = {
  comicsCollection: [],
  userComicsCollection: [],
  comicsToShow: {}
};

const comics = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COMICS":
      return {
        ...state,
        comicsCollection: [...action.payload, ...state.comicsCollection]
      };
    case "FETCH_USER_COMICS":
      return {
        ...state,
        userComicsCollection: action.payload
      };
    case "SHOW":
      return {
        ...state,
        comicsToShow: state.comicsCollection.find(p => p.id === action.id)
      };
    default:
      return state;
  }
};

export default comics;
