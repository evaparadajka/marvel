import axios from "axios";

const apiMarvel = axios.create({
  baseURL: "http://gateway.marvel.com/v1/public",
  params: {
    apikey: "93e03380bbb458e68945c50bdd245b08",
    limit: 20
  },
  headers: {
    Accept: "*/*"
  }
});

export default apiMarvel;
