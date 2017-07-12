const initialState = {
  charactersCollection: [
    { id: 1, name: "name1", description: "desc1" },
    { id: 2, name: "name2", description: "desc2" },
    { id: 3, name: "name3", description: "desc3" },
    { id: 4, name: "name4", description: "desc4" },
    { id: 5, name: "name5", description: "desc5" },
    { id: 6, name: "name6", description: "desc6" }
  ]
};

const characters = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default characters;
