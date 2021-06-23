import React from "react";
import {Switch} from "react-router-dom";
import CNST from "../constants";
import IsNotAuthUser from "./IsNotAuthUser";

import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";

export const AppRouter = () => (
  <Switch>
    <IsNotAuthUser exact path={CNST.ROUTES.SIGN_IN} component={SignIn} />
    <IsNotAuthUser exact path={CNST.ROUTES.SIGN_UP} component={SignUp} />
  </Switch>
);

export default AppRouter;
