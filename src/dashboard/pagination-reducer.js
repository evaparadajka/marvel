const initialState = {
  pages: {},
  activePage: 0,
  pagesCount: 0
};

const paginationCharacters = (state = initialState, action) => {
  switch (action.type) {
    case "CHARACTERS_PAGINATE":
      return {
        ...state,
        pages: {
          ...state.pages,
          [state.pagesCount]: action.charactersOnPage
        },
        pagesCount: state.pagesCount + 1
      };
    case "CHARACTERS/LOAD_NEXT_PAGE":
      return {
        ...state,
        activePage: state.activePage + 1
      };
    case "CHARACTERS/LOAD_PREVIOUS_PAGE":
      return {
        ...state,
        activePage: state.activePage - 1
      };
    case "CHARACTERS/LOAD_PAGE":
      return {
        ...state,
        activePage: action.payload
      };
    case "CHARACTERS/SAVE_PAGE":
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.page]: action.charactersOnPage
        },
        pagesCount: state.pagesCount + 1
      };
    default:
      return state;
  }
};

export default paginationCharacters;
