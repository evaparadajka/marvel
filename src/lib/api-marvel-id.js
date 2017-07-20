import axios from "axios";

const apiMarvelId = axios.create({
  baseURL: "http://gateway.marvel.com/v1/public/characters/",
  params: {
    apikey: "b90065a452f43269c85d202182a6d4b3"
  },
  headers: {
    Accept: "*/*"
  }
});

export default apiMarvelId;
