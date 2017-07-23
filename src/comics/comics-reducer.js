const initialState = {
  comicsCollection: [],
  userComicsCollection: [],
  comicsToShow: {},
  weHaveFetched: 0
};

const comics = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COMICS":
      return {
        ...state,
        comicsCollection: [...state.comicsCollection, ...action.payload],
        weHaveFetched: state.weHaveFetched + 20
      };
    case "FETCH_USER_COMICS":
      return {
        ...state,
        userComicsCollection: action.payload
      };
    case "FETCH_ONE_USER_COMIC":
      return {
        ...state,
        comicsCollection:
          typeof state.comicsCollection.find(
            p => p.id === action.payload.id
          ) === "undefined"
            ? [...state.comicsCollection, action.payload]
            : [...state.comicsCollection]
      };
    case "COMICS/ADD_TO_FAVOURITES":
      return {
        ...state,
        userComicsCollection: [...state.userComicsCollection, action.payload]
      };
    case "COMICS/DELETE_FROM_FAVOURITES":
      return {
        ...state,
        userComicsCollection: state.userComicsCollection.filter(
          c => c.id !== action.payload
        )
      };
    case "COMIC/SHOW":
      return {
        ...state,
        comicsToShow: state.comicsCollection.find(p => p.id === action.id)
      };
    case "COMIC/SHOW/FETCH":
      return {
        ...state,
        comicsToShow: action.payload,
        comicsCollection:
          state.comicsCollection[state.comicsCollection.length - 1].id ===
          action.payload.id
            ? [...state.comicsCollection]
            : [...state.comicsCollection, action.payload]
      };
    default:
      return state;
  }
};

export default comics;
