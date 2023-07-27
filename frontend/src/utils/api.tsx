import axios from 'axios';

const API_BASE_URL = '/api'; // Your API base URL

const api = axios.create({
  baseURL: "http://localhost:3001",
});

// Interceptor for handling responses
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle errors here (e.g., show an error message or redirect)
    console.error('Request failed:', error);
    return Promise.reject(error);
  }
);

export default api;
