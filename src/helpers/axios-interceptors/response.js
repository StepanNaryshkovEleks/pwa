import axios from "axios";
import {signOutAction} from "../../redux/actions/user/signOut";
import {store} from "./../../index";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      throw error;
    }

    if (error.response.status >= 400) {
      store.dispatch(signOutAction());
      throw error;
    }

    throw error;
  }
);
