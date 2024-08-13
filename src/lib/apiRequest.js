import axios from "axios";

const apiRequest = axios.create({
  //baseURL: "http://localhost:8800/api",
  baseURL: "https://estate-server-j0yg.onrender.com",
  withCredentials: true,
});

export default apiRequest;

// const apiRequest = "http://localhost:8800/api";

// export default apiRequest;