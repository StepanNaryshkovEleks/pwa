import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import CNST from "../constants";

const IsAuthUser = ({
  component: Component,
  isLoggedIn,
  permissions,
  savePrevPathName,
  clearPrevPathName,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={CNST.ROUTES.HOME} />
      }
    />
  );
};

export const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps, null)(IsAuthUser);
