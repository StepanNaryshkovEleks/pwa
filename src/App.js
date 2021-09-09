import React, {useEffect} from "react";
import AppRouter from "./routes";
import {initUserAction} from "./redux/actions/user/initUser";
import {connect} from "react-redux";
import Spinner from "./components/spinner";
import {Button, notification} from "antd";

const openNotification = () => {
  notification.warning({
    className: "no-internet-popup",
    message: `No internet connection. Please try again later`,
    description: (
      <Button type="link" onClick={() => document.location.reload()}>
        Refresh page
      </Button>
    ),
    placement: "topRight",
  });
};

function App({initUser, fetching}) {
  useEffect(() => {
    window.addEventListener("offline", () => openNotification());
  }, []);

  useEffect(() => {
    initUser();
  }, [initUser]);
  return (
    <>
      {fetching && <Spinner />}
      <AppRouter />
    </>
  );
}

export const mapStateToProps = (state) => ({
  isUserInitialized: state.user.isUserInitialized,
  fetching: state.user.fetching,
});

export const mapDispatchToProps = (dispatch) => ({
  initUser: (props) => dispatch(initUserAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
