import axios from "axios";

const API = axios.create({
  baseURL:
    "https://quiz-system-xy79.onrender.com/api"
});

export default API;