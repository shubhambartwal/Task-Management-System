import axios from "axios";

export const register = (userData) =>
  axios.post(`${import.meta.env.VITE_API_URL_AUTH}/register`, userData);
export const login = (userData) =>
  axios.post(`${import.meta.env.VITE_API_URL_AUTH}/login`, userData);
