import apiClient from "../lib/api-client";
import { hashHistory } from "react-router";

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
        // czemu 2 oddzielne dispatche tutaj?
        dispatch({
          type: "LOGIN",
          data: {
            email: user.email,
            token: response.data.data.auth_token,
            user_id: response.data.data.user_id
          }
        });
        dispatch({
          type: "LOGIN_SUCCESS"
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
