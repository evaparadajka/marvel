import apiClient from "../lib/api-client";

export const addToFavourites = comic => {
  return (dispatch, getState) => {
    apiClient
      .post("/marvel/api/v1/create_comic", {
        comic: {
          title: comic.title,
          external_id: comic.id
        }
      })
      .then(response => {
        dispatch({
          type: "COMICS/ADD_TO_FAVOURITES",
          payload: response.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const deleteFromFavourites = comic => {
  return (dispatch, getState) => {
    console.log(comic.binarId, "binarId");
    apiClient
      .delete("/marvel/api/v1/delete_comic/" + comic.binarId)
      .then(response => {
        dispatch({
          type: "COMICS/DELETE_FROM_FAVOURITES",
          payload: comic.binarId
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
};

export const fetchFavouriteComics = () => {
  return (dispatch, getState) => {
    console.log("fetchFavouriteComics");
    apiClient
      .get("/marvel/api/v1/fetch_comics")
      .then(response => {
        console.log(response);
        dispatch({
          type: "FETCH_USER_COMICS",
          payload: response.data.comics
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};
