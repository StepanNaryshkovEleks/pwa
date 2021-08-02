import axios from "axios";

axios.defaults.baseURL =
  window.location.hostname !== "localhost"
    ? "https://api.bucha.click:35353"
    : "http://localhost:8010/proxy";
