import axios from "axios";

const apiMarvel = axios.create({
  baseURL: "http://gateway.marvel.com/v1/public",
  params: {
    apikey: "b90065a452f43269c85d202182a6d4b3",
    limit: 20
  },
  headers: {
    Accept: "*/*"
  }
});

export default apiMarvel;
