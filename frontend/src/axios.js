import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:9000",
  baseURL: "https://gmail-clone-rk.herokuapp.com",
});

export default instance;
