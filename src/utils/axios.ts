import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv();

export const evolutionApi = axios.create({
  baseURL: process.env.EVOLUTION_API_PATH,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    apikey: process.env.EVOLUTION_API_KEY,
  },
});

export const asaasApi = axios.create({
  baseURL: process.env.ASAAS_API_PATH,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    access_token: process.env.ASAAS_API_KEY,
  },
});