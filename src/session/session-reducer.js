const initialState = { email: "", token: "", status: "" };
const session = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        email: action.data.email,
        token: action.data.token,
        user_id: action.data.user_id
      };
    case "LOGOUT":
      return { email: "", password: "", user_id: "" };
    case "LOGIN_PROCESSING":
      return { ...state, status: "Signing in progress..." };
    case "LOGIN_SUCCESS":
      return { ...state, status: "Success" };
    case "LOGIN_FAILED":
      return { ...state, status: "Login failed" };
    default:
      return state;
  }
};

export default session;
