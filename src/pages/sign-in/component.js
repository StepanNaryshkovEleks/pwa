import React from 'react';
import CNST from '../../constants';
import {Link} from "react-router-dom";

export const SignIn = () => {
  return (<>
    <h1>Sign in page</h1>
    <Link to={CNST.ROUTES.SIGN_UP}>sign up</Link>
  </>);
};
