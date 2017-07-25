export const getCharDetails = (state, charID) => {
  const charResult = state.characters.charactersCollection.find(c => {
    return c.id === charID;
  })
    ? state.characters.charactersCollection.find(c => {
        return c.id === charID;
      })
    : { needCharacterID: charID };
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

export const appendFavourites = state => {
  const characters = state.characters.charactersCollection.map(c => {
    state.characters.userCharactersCollection.map(userChar => {
      if (c.id === userChar.external_id) {
        c = { ...c, isFavourite: true, binarId: userChar.id };
      }
    });
    return c;
  });

  return characters;
};

export const fetchPaginatedCharacters = state => {
  const activePage = state.paginationCharacters.activePage;

  let paginatedCharacters = [];
  for (var i = 0; i < activePage; i++) {
    state.paginationCharacters.pages[i].map(c => {
      paginatedCharacters.push(c);
    });
  }

  if (typeof paginatedCharacters === "undefined") return [];
  else {
    const result = paginatedCharacters.map(id => {
      return getCharDetails(state, id);
    });

    return result;
    // console.log("result", result);
  }
};
