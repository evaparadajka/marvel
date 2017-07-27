const isInCollection = (state, charID) => {
  return state.characters.charactersCollection.find(c => {
    return c.id === charID;
  });
};
const areIdsEqual = (firstID, secondID) => {
  return firstID === secondID;
};
export const getCharDetails = (state, charID) => {
  const charResult = isInCollection(state, charID)
    ? state.characters.charactersCollection.find(c => areIdsEqual(c.id, charID))
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

export const fetchPaginatedCharacters = state => {
  const paginatedCharacters =
    state.paginationCharacters.pages[state.paginationCharacters.activePage];
  if (typeof paginatedCharacters === "undefined") return [];
  else {
    const result = paginatedCharacters.map(id => {
      return getCharDetails(state, id);
    });
    return result;
  }
};

//***** INFINITE SCROLL ****
// export const fetchPaginatedCharacters = state => {
//   const activePage = state.paginationCharacters.activePage;
//
//   let paginatedCharacters = [];
//   for (var i = 0; i < activePage; i++) {
//     state.paginationCharacters.pages[i].map(c => {
//       paginatedCharacters.push(c);
//     });
//   }
//
//   if (typeof paginatedCharacters === "undefined") return [];
//   else {
//     const result = paginatedCharacters.map(id => {
//       return getCharDetails(state, id);
//     });
//
//     return result;
//
//   }
// };
