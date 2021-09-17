import React, {useEffect, useState} from "react";
import AppRouter from "./routes";
import {initUserAction} from "./redux/actions/user/initUser";
import {connect} from "react-redux";
import Spinner from "./components/spinner";
import {Button, Result} from "antd";

function App({initUser, fetching}) {
  const [isOffline, setOffline] = useState(false);
  useEffect(() => {
    window.addEventListener("offline", () => setOffline((isOffline) => !isOffline));
    window.addEventListener("online", () => setOffline((isOffline) => !isOffline));
  }, []);

  useEffect(() => {
    initUser();
  }, [initUser]);
  return (
    <>
      {fetching && <Spinner />}
      {isOffline && (
        <div className="no-internet">
          <Result
            status="warning"
            title="No internet connection. Please try again later"
            extra={
              <Button type="primary" onClick={() => document.location.reload()}>
                Refresh page
              </Button>
            }
          />
        </div>
      )}
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
