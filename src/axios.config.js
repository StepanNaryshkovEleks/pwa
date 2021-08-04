import axios from "axios";

axios.defaults.baseURL =
  window.location.hostname !== "localhost"
    ? "https://api.bucha.click:37677"
    : "http://localhost:8010/proxy";
