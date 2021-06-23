import React from 'react';
import CNST from '../../constants';
import {Link} from "react-router-dom";
import { Switch } from 'antd';

export const SignIn = () => {
  return (<>
    <h1>Sign in page</h1>
    <Switch defaultChecked />
    <Link to={CNST.ROUTES.SIGN_UP}>sign up</Link>
  </>);
};
