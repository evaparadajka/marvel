const initialState = {
  charactersCollection: [],
  userCharactersCollection: [],
  characterToShow: {}
};

const characters = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CHAR":
      return {
        ...state,
        charactersCollection: [...state.charactersCollection, ...action.payload]
      };
    case "FETCH_USER_CHAR":
      return {
        ...state,
        userCharactersCollection: action.payload
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
        characterToShow: action.payload
      };
    default:
      return state;
  }
};

export default characters;
