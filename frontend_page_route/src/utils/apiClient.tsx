import axios from "axios";
import Cookie from "js-cookie";

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
})

export const setClientAuthHeader = () => {
  const token = Cookie.get("accessToken")

  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common["Authorization"]
  }
}

export default apiClient