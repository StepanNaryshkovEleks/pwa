import axios from "axios";

// axios.defaults.baseURL = "https://api.bucha.click:35353";
// axios.defaults.baseURL = "https://bucha.click:35353";
//axios.defaults.baseURL = "http://localhost:8010/proxy";

axios.defaults.baseURL =
  window.location.hostname !== "localhost"
    ? "https://api.bucha.click:37677"
    : "http://localhost:8010/proxy";
