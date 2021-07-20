import React, {useEffect} from "react";
import AppRouter from "./routes";
import {initUserAction} from "./redux/actions/user/initUser";
import {connect} from "react-redux";
import Spinner from "./components/spinner";

function App({initUser, fetching}) {
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
