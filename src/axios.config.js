import axios from "axios";

axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers["Access-Control-Allow-Methods"] =
  "GET, PUT, POST, DELETE, OPTIONS";
axios.defaults.baseURL = "https://api.bucha.click:45709";
