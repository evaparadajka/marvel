const initialState = {
  charactersCollection: [],
  userCharactersCollection: [],
  characterToShow: {},
  thumbnailsToShow: [],
  weHaveFetched: 0
};

const characters = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_THUMBNAILS":
      return {
        ...state,
        thumbnailsToShow: [
          ...state.thumbnailsToShow.filter(c => c.id !== action.payload),
          action.payload
        ]
      };
    case "FETCH_CHAR":
      return {
        ...state,
        charactersCollection: [
          ...state.charactersCollection,
          ...action.payload
        ],
        weHaveFetched: state.weHaveFetched + 20
      };
    case "CHARACTERS/FETCH_PAGE_CHARACTERS":
      return {
        ...state,
        charactersCollection: [...state.charactersCollection, ...action.payload]
      };
    case "FETCH_USER_CHAR":
      return {
        ...state,
        userCharactersCollection: action.payload
      };
    case "FETCH_ONE_USER_CHAR":
      return {
        ...state,
        charactersCollection:
          typeof state.charactersCollection.find(
            p => p.id === action.payload.id
          ) === "undefined"
            ? [...state.charactersCollection, action.payload]
            : [...state.charactersCollection]
      };
    case "CHARACTERS/ADD_TO_FAVOURITES":
      return {
        ...state,
        userCharactersCollection: [
          ...state.userCharactersCollection,
          action.payload
        ]
      };
    case "CHARACTERS/DELETE_FROM_FAVOURITES":
      return {
        ...state,
        userCharactersCollection: state.userCharactersCollection.filter(
          c => c.id !== action.payload
        )
      };
    case "SHOW":
      return {
        ...state,
        characterToShow: state.charactersCollection.find(
          p => p.id === action.id
        )
      };
    case "SHOW/FETCH":
      return {
        ...state,
        characterToShow: action.payload,
        charactersCollection:
          state.charactersCollection[state.charactersCollection.length - 1]
            .id === action.payload.id
            ? [...state.charactersCollection]
            : [...state.charactersCollection, action.payload]
      };
    default:
      return state;
  }
};

export default characters;
