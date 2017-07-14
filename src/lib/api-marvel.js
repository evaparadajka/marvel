import axios from "axios";

const apiMarvel = axios.create({
  baseURL: "http://gateway.marvel.com/v1/public",
  headers: {
    Accept: "*/*"
  }
});

export default apiMarvel;
