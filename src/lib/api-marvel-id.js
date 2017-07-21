import axios from "axios";

const apiMarvelId = axios.create({
  baseURL: "http://gateway.marvel.com/v1/public/characters/",
  params: {
    apikey: "93e03380bbb458e68945c50bdd245b08"
  },
  headers: {
    Accept: "*/*"
  }
});

export default apiMarvelId;
