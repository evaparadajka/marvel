export const getComicDetails = (state, comicID) => {
  const comicResult = state.comics.comicsCollection.find(c => {
    return c.id === comicID;
  });

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
