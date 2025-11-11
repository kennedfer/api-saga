import axios from "axios";

export const api = axios.create({
  baseURL: process.env.EVOLUTION_API_PATH,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    apikey: process.env.EVOLUTION_API_KEY,
  },
});
