import * as CryptoJS from "crypto-js";
import * as ls from "local-storage";

export const setToken = (token) => {
  const encodedToken = CryptoJS.AES.encrypt(token, "token").toString();
  ls.set("token", encodedToken);
};

export const getToken = () => {
  const encodedToken = ls.get("token");
  if (encodedToken) {
    const bytes = CryptoJS.AES.decrypt(encodedToken, "token");
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  return undefined;
};

export const removeToken = () => {
  ls.remove("token");
};
