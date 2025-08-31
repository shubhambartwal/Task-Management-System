import axios from "axios";
const config = (token) => {
  console.log("Token being passed:", token);
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
const API_URL = import.meta.env.VITE_API_URL_TASK;
export const getTasks = (token) => axios.get(`${API_URL}`, config(token));
export const createTask = (taskData, token) =>
  axios.post(`${API_URL}`, taskData, config(token));
export const updateTask = (id, taskData, token) =>
  axios.put(`${API_URL}/${id}`, taskData, config(token));
export const deleteTask = (id, token) =>
  axios.delete(`${API_URL}/${id}`, config(token));
