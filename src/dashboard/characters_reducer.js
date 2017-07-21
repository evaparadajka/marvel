const initialState = {
  charactersCollection: [],
  userCharactersCollection: [],
  characterToShow: {},
  weHaveFetched: 0
};

const characters = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CHAR":
      return {
        ...state,
        charactersCollection: [
          ...state.charactersCollection,
          ...action.payload
        ],
        weHaveFetched: state.weHaveFetched + 20
      };
    case "FETCH_USER_CHAR":
      return {
        ...state,
        userCharactersCollection: action.payload
      };
    case "FETCH_ONE_USER_CHAR":
      console.log("fetch one user character");
      return {
        ...state,
        charactersCollection:
          state.charactersCollection[state.charactersCollection.length - 1]
            .id === action.payload.id
            ? [...state.charactersCollection]
            : [...state.charactersCollection, action.payload]
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
