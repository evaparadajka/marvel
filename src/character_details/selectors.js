export const getCharDetails = (state, charID) => {
  const charResult = state.characters.charactersCollection.find(c => {
    return c.id === charID;
  });

  const userCharResult = state.characters.userCharactersCollection.find(
    c => c.external_id === charID
  );
  if (userCharResult) {
    return { ...charResult, binarId: userCharResult.id, isFavourite: true };
  } else {
    return { ...charResult, isFavourite: false };
  }
};

export const getFavouriteCharacters = state => {
  const favouriteCharactersIDs = state.characters.userCharactersCollection.map(
    c => c.external_id
  );

  return favouriteCharactersIDs.map(id => {
    return getCharDetails(state, id);
  });
};
