import axios from "axios";

// const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export default api;
