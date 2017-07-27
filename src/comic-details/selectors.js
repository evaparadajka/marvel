const isInCollection = (state, comicID) => {
  return state.comics.comicsCollection.find(c => {
    return c.id === comicID;
  });
};
const areIdsEqual = (firstID, secondID) => {
  return firstID === secondID;
};
export const getComicDetails = (state, comicID) => {
  const comicResult = isInCollection(state, comicID)
    ? state.comics.comicsCollection.find(c => areIdsEqual(c.id, comicID))
    : { needComicID: comicID };

  const userComicResult = state.comics.userComicsCollection.find(
    c => c.external_id === comicID
  );
  if (userComicResult) {
    return { ...comicResult, binarId: userComicResult.id, isFavourite: true };
  } else {
    return { ...comicResult, isFavourite: false };
  }
};

export const getFavouriteComics = state => {
  const favouriteComicsIDs = state.comics.userComicsCollection.map(
    c => c.external_id
  );

  return favouriteComicsIDs.map(id => {
    return getComicDetails(state, id);
  });
};

export const fetchPaginatedComics = state => {
  const paginatedComics =
    state.paginationComics.pages[state.paginationComics.activePage];
  if (typeof paginatedComics === "undefined") return [];
  else {
    const result = paginatedComics.map(id => {
      return getComicDetails(state, id);
    });
    return result;
  }
};

// export const fetchPaginatedComics = state => {
//   const activePage = state.paginationComics.activePage;
//
//   let paginatedComics = [];
//   for (var i = 0; i < activePage; i++) {
//     state.paginationComics.pages[i].map(c => {
//       paginatedComics.push(c);
//     });
//   }
//   if (typeof paginatedComics === "undefined") return [];
//   else {
//     const result = paginatedComics.map(id => {
//       return getComicDetails(state, id);
//     });
//
//     return result;
//   }
// };
