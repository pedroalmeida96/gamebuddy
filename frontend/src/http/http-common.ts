import axios from "axios";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlkIjoxLCJleHAiOjE2OTUwNTE1MDF9.b6A6QFH24tKFd6fooR4NhzKMg7j8ru1X9VuyL1OpWfo";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    Authorization : TOKEN,
    "Content-type": "application/json"
  }
});