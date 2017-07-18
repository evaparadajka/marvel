import apiClient from "../lib/api-client";
export const addToFavourites = character => {
  return (dispatch, getState) => {
    apiClient
      .post("/marvel/api/v1/create_character", {
        character: {
          name: character.name,
          external_id: character.id
        }
      })
      .then(response => {
        dispatch({
          type: "CHARACTERS/ADD_TO_FAVOURITES",
          payload: response.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const deleteFromFavourites = character => {
  return (dispatch, getState) => {
    apiClient
      .delete("/marvel/api/v1/delete_character/" + character.binarId)
      .then(response => {
        dispatch({
          type: "CHARACTERS/DELETE_FROM_FAVOURITES",
          payload: character.binarId
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const fetchFavouriteCharacters = () => {
  return (dispatch, getState) => {
    // console.log
    console.log("fetchFavouriteCharacters");
    apiClient
      .get("/marvel/api/v1/fetch_characters")
      .then(response => {
        // console.log
        console.log(response);
        dispatch({
          type: "FETCH_USER_CHAR",
          payload: response.data.characters
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};
