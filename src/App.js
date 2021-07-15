import React, {useEffect} from "react";
import AppRouter from "./routes";
import {initUserAction} from "./redux/actions/user/initUser";
import {connect} from "react-redux";

function App({initUser}) {
  useEffect(() => {
    initUser();
  }, [initUser]);
  return <AppRouter />;
}

export const mapStateToProps = (state) => ({
  isUserInitialized: state.user.isUserInitialized,
  isFetchingProfile: state.user.isFetchingProfile,
});

export const mapDispatchToProps = (dispatch) => ({
  initUser: (props) => dispatch(initUserAction(props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
