import React from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import AuthLayout from "../layouts/auth";

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
      render={(props) => (
        <AuthLayout permissions={permissions}>
          <Component {...props} />
        </AuthLayout>
      )}
    />
  );
};

export const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});

export const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(IsAuthUser);
