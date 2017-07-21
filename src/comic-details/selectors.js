export const getComicDetails = (state, comicID) => {
  const comicResult = state.comics.comicsCollection.find(c => {
    return c.id === comicID;
  })
    ? state.comics.comicsCollection.find(c => {
        return c.id === comicID;
      })
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

export const appendFavouritesComics = state => {
  const comics = state.comics.comicsCollection.map(c => {
    state.comics.userComicsCollection.map(userComic => {
      if (c.id === userComic.external_id) {
        c = { ...c, isFavourite: true, binarId: userComic.id };
      }
    });
    return c;
  });

  return comics;
};
