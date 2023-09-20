import axios from "axios";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlkIjoxLCJleHAiOjE2OTUyMDg2MzJ9.jsWX2k3AYPNMEJOOFEEfwan8FL_Hm8cQNvXDqvy9M84";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    Authorization : TOKEN,
    "Content-type": "application/json"
  }
});