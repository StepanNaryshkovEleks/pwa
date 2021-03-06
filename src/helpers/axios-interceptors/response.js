import axios from "axios";
import {notification} from "antd";
import {signOutAction} from "../../redux/actions/user/signOut";
import {store} from "./../../index";

const openNotificationWithIcon = (code, text) => {
  const description = text ? text : "Something went wrong, " + code + " error.";
  notification["error"]({
    message: "Error",
    description,
  });
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      throw error;
    }

    if (error.response.status >= 400) {
      if (error.response.status === 403) {
        if (error.response.config.url === "application/vee/signin") {
          openNotificationWithIcon("", "Incorrect username or password");
        } else {
          store.dispatch(signOutAction());
        }
      } else {
        openNotificationWithIcon(error.response.status);
      }
      throw error;
    }

    throw error;
  }
);
