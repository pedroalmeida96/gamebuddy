import axios from "axios";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlkIjoxLCJleHAiOjE2OTUwNjk2NTF9.BFgu5g0u0mcYnB9yQcxmwQdghdCgHA1Km8ZEuuyE5-w";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    Authorization : TOKEN,
    "Content-type": "application/json"
  }
});