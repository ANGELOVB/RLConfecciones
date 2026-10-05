import axios from "axios";

export const api = axios.create({
  baseURL: "https://rl-confecciones.com/test/api-rest/public/api",
});