import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import AuthLayout from '../layouts/auth';


const IsNotAuthUser = ({component: Component, isLoggedIn, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedIn ? (
          <Component {...props} />
        ) : (
          <AuthLayout permissions={[]} />
        )
      }
    />
  );
};

export const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(IsNotAuthUser);
