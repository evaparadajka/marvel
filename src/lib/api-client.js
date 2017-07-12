import axios from "axios";
const apiClient = axios.create({
  baseURL: "https://praktyki-react.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

const configureApi = store => {
  apiClient.interceptors.request.use(
    function(config) {
      const state = store.getState();
      if (state.session.token) {
        config.headers["X-User-Email"] = state.session.email;
        config.headers["X-User-Token"] = state.session.token;
      }
      console.log(store.getState(), config);

      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
};
// Add a request interceptor
export { configureApi };
export default apiClient;
