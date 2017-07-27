import axios from "axios";

const apiMarvelIdComic = axios.create({
  baseURL: "http://gateway.marvel.com/v1/public/comics/",
  params: {
    apikey: "b90065a452f43269c85d202182a6d4b3"
  },
  headers: {
    Accept: "*/*"
  }
});

export default apiMarvelIdComic;
