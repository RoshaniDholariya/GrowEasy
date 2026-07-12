import axios from "axios";

const api = axios.create({
  baseURL: "https://groweasy-c7ff.onrender.com/api",
});

export default api;