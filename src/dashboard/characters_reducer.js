const initialState = {
  charactersCollection: [],
  characterToShow: {}
};

const characters = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CHAR":
      return {
        ...state,
        charactersCollection: action.payload
      };
    case "SHOW":
      return {
        ...state,
        characterToShow: state.charactersCollection.find(
          p => p.id === action.id
        )
      };
    default:
      return state;
  }
};

export default characters;
