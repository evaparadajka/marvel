const initialState = {
  pages: {}, // [{1, [id11, id12, id13 ...]}, {2, [id21, id22, id23, ...]} ]
  activePage: 0,
  pagesCount: 0
};

const pagination = (state = initialState, action) => {
  switch (action.type) {
    case "PAGINATE_CHARACTERS":
      return {
        ...state,
        pages: {
          ...state.pages,
          [state.pagesCount]: action.charactersOnPage
        },
        pagesCount: state.pagesCount + 1
      };
    case "LOAD_NEXT_PAGE":
      return {
        ...state,
        activePage: state.activePage + 1
      };
    case "LOAD_PREVIOUS_PAGE":
      return {
        ...state,
        activePage: state.activePage - 1
      };
    default:
      return state;
  }
};

export default pagination;
