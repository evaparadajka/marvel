const session = (state = { email: "", token: "", status: "" }, action) => {
  switch (action.type) {
    case "LOGIN":
      console.log(action.data);
      return {
        ...state,
        email: action.data.email,
        token: action.data.token,
        user_id: action.data.user_id
      };
    case "LOGOUT":
      return { email: "", password: "", user_id: "" };
    case "LOGIN_PROCESSING":
      return { ...state, status: action.data };
    default:
      return state;
  }
};

export default session;
