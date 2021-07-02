import React from "react";
import {Switch} from "react-router-dom";
import CNST from "../constants";
import IsNotAuthUser from "./IsNotAuthUser";

import Interests from "../pages/interests";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import Home from "../pages/home";
import CreatingPassword from "../pages/creating-password";

export const AppRouter = () => (
  <Switch>
    <IsNotAuthUser exact path={CNST.ROUTES.HOME} component={Home} />
    <IsNotAuthUser exact path={CNST.ROUTES.SIGN_IN} component={SignIn} />
    <IsNotAuthUser exact path={CNST.ROUTES.SIGN_UP} component={SignUp} />
    <IsNotAuthUser
      exact
      path={CNST.ROUTES.CREATING_PASSWORD}
      component={CreatingPassword}
    />
    <IsNotAuthUser exact path={CNST.ROUTES.INTERESTS} component={Interests} />
  </Switch>
);

export default AppRouter;
