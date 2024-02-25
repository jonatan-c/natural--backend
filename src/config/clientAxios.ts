import axios from "axios";
import { POKEAPI_BASE_URL } from ".";

const clientAxios = axios.create({
  baseURL: POKEAPI_BASE_URL,
});

export default clientAxios;
