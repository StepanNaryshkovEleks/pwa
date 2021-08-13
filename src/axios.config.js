import axios from "axios";

axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers["Access-Control-Allow-Methods"] =
  "GET, PUT, POST, DELETE, OPTIONS";
axios.defaults.baseURL =
  window.location.hostname !== "localhost"
    ? "https://api.bucha.click:42911"
    : "http://localhost:8010/proxy";
