import axios from "axios";
import {notification} from "antd";
import {signOutAction} from "../../redux/actions/user/signOut";
import {store} from "./../../index";

const openNotificationWithIcon = (code) => {
  notification["error"]({
    message: "Error",
    description: "Something went wrong, " + code + " error.",
  });
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      throw error;
    }

    if (error.response.status >= 400) {
      // we call het profile each time after refreshing the page to check if user can log in
      // so, in this case it is not necessary to show an error
      if (error.response.config.data !== '{"jsonType":"vee.FetchIdentificationForm"}') {
        // openNotificationWithIcon(error.response.status);
      } else {
        store.dispatch(signOutAction());
      }
      throw error;
    }

    throw error;
  }
);
