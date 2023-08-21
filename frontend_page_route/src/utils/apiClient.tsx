import axios from "axios";
import Cookie from "js-cookie";

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
})

apiClient.interceptors.request.use(
  (config) => {
    const token = Cookie.get("accessToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
);
export default apiClient