const initialState = {
  charactersCollection: [],
  characterToShow: {}
};
//   charactersCollection: [
//     {
//       id: 1,
//       name: "name1",
//       description: "desc1",
//       img:
//         "http://x.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/standard_fantastic.jpg"
//     },
//     {
//       id: 2,
//       name: "name2",
//       description: "desc2",
//       img:
//         "http://x.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/standard_fantastic.jpg"
//     },
//     {
//       id: 3,
//       name: "name3",
//       description: "desc3",
//       img:
//         "http://x.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/standard_fantastic.jpg"
//     },
//     {
//       id: 4,
//       name: "name4",
//       description: "desc4",
//       img:
//         "http://x.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/standard_fantastic.jpg"
//     },
//     {
//       id: 5,
//       name: "name5",
//       description: "desc5",
//       img:
//         "http://x.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/standard_fantastic.jpg"
//     },
//     {
//       id: 6,
//       name: "name6",
//       description: "desc6",
//       img:
//         "http://x.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/standard_fantastic.jpg"
//     }
//   ]

const characters = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CHAR":
      return {
        ...state,
        charactersCollection: action.payload
      };
    case "SHOW":
      return {
        ...state,
        characterToShow: state.charactersCollection.find(
          p => p.id === action.id
        )
      };
    default:
      return state;
  }
};

export default characters;
