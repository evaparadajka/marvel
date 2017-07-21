import axios from "axios";

const apiMarvelIdComic = axios.create({
  baseURL: "http://gateway.marvel.com/v1/public/comics/",
  params: {
    apikey: "93e03380bbb458e68945c50bdd245b08"
  },
  headers: {
    Accept: "*/*"
  }
});

export default apiMarvelIdComic;
