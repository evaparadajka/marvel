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
        comicsCollection: [...state.comicsCollection, ...action.payload]
      };
    case "FETCH_USER_COMICS":
      return {
        ...state,
        userComicsCollection: action.payload
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
        comicToShow: action.payload,
        comicsCollection: [...state.comicsCollection, action.payload]
      };
    default:
      return state;
  }
};

export default comics;
