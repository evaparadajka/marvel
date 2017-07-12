const initialState = {
  charactersCollection: []
};

const characters = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CHAR":
      return {
        charactersCollection: action.payload
      };
    default:
      return state;
  }
};

export default characters;
