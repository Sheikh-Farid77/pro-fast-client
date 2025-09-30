import axios from "axios";

export default function useAxios() {
  const api = axios.create({
    baseURL: `http://localhost:5000`,
  });
  return api;
}
