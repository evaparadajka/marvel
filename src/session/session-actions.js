import apiClient from "../lib/api-client";
import { hashHistory } from "react-router";

// spora ta akcja, moznaby jakos podzielic to
export const signIn = user => {
  return (dispatch, getState) => {
    dispatch({
      type: "LOGIN_PROCESSING"
    });
    return apiClient
      .post("/api/v1/sessions", {
        user: {
          email: user.email,
          password: user.password
        }
      })
      .then(response => {
        dispatch({
          type: "LOGIN",
          data: {
            email: user.email,
            token: response.data.data.auth_token,
            user_id: response.data.data.user_id
          }
        });

        hashHistory.push("/");
      })
      .catch(error => {
        console.error(error);
        dispatch({
          type: "LOGIN_FAILED"
        });
      });
  };
};
