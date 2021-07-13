import React from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import CNST from "../constants";

const IsNotAuthUser = ({component: Component, isLoggedIn, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn ? <Component {...props} /> : <Redirect to={CNST.ROUTES.DASHBOARD} />
      }
    />
  );
};

export const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(IsNotAuthUser);
