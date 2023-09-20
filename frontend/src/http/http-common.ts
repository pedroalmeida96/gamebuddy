import axios from "axios";

const TOKEN = localStorage.getItem("token");

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    Authorization : TOKEN,
    "Content-type": "application/json"
  }
});