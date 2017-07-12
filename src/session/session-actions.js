import apiClient from "../lib/api-client";
import { hashHistory } from "react-router"; //with router tylko do komponentow

export const signIn = user => {
  return (dispatch, getState) => {
    dispatch({
      type: "LOGIN_PROCESSING",
      data: "Signing in progress"
    });
    return apiClient
      .post("/api/v1/sessions", {
        //dane z naszego formularza w postaci obiektu
        //axios post zwraca promise
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
        dispatch({
          type: "LOGIN_PROCESSING",
          data: "Success"
        });
        hashHistory.push("/");
      })
      .catch(error => {
        console.error(error);
      });
  };
};

// apiClient
//   .post("/api/v1/sessions", {
//     //dane z naszego formularza w postaci obiektu
//     //axios post zwraca promise
//     user: {
//       email: this.state.email,
//       password: this.state.password
//     }
//   })
//   .then(response => {
//     //console.log(response);
//     this.props.dispatch(
//       signIn({
//         email: response.data.data.email,
//         token: response.data.data.auth_token,
//         user_id: response.data.data.user_id
//       })
//     );
//
//     this.setState({
//       email: "",
//       password: ""
//     });
//
//     this.props.router.push("posts");
//   })
//   .catch(error => {
//     console.dir(error);
//     this.setState({
//       error: "Coś poszło nie tak"
//     });
//   });
