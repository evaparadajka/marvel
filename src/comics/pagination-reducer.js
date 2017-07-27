const initialState = {
  pages: {},
  activePage: 0,
  pagesCount: 0
};

const paginationComics = (state = initialState, action) => {
  switch (action.type) {
    case "COMICS_PAGINATE":
      return {
        ...state,
        pages: {
          ...state.pages,
          [state.pagesCount]: action.charactersOnPage
        },
        pagesCount: state.pagesCount + 1
      };
    case "COMICS/LOAD_NEXT_PAGE":
      return {
        ...state,
        activePage: state.activePage + 1
      };
    case "COMICS/LOAD_PREVIOUS_PAGE":
      return {
        ...state,
        activePage: state.activePage - 1
      };
    case "COMICS/LOAD_PAGE":
      return {
        ...state,
        activePage: action.payload
      };
    case "COMICS/SAVE_PAGE":
      return {
        ...state,
        pages: {
          ...state.pages,
          [action.page]: action.comicsOnPage
        },
        pagesCount: state.pagesCount + 1
      };
    default:
      return state;
  }
};

export default paginationComics;
