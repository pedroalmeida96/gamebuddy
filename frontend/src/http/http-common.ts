import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImlkIjoxLCJleHAiOjE2OTUwNDUzMzR9.rI8hqO7F0G54ILsxBbq8HnAyL3t3_gwaEWwoyoAZMlc";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    Authorization : TOKEN,
    "Content-type": "application/json"
  }
});