import React from "react";
import {Switch} from "react-router-dom";
import CNST from "../constants";
import IsNotAuthUser from "./IsNotAuthUser";
import IsAuthUser from "./IsAuthUser";

import Interests from "../pages/interests";
import SignIn from "../pages/sign-in";
import SignUp from "../pages/sign-up";
import Home from "../pages/home";
import CreatingPassword from "../pages/creating-password";
import Settings from "../pages/settings";
import Dashboard from "../pages/dashboard";
import CreateChallenge from "../pages/creating-challenge";
import UploadMedia from "../pages/upload-media";
import Invitation from "../pages/invitation";
import InvitationOptions from "../pages/invitation-options";
import InviteByName from "../pages/invite-by-name";

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
    <IsAuthUser
      exact
      path={`${CNST.ROUTES.UPLOAD_MEDIA}/:challengeId`}
      component={UploadMedia}
    />
    <IsAuthUser
      exact
      path={`${CNST.ROUTES.UPLOAD_MEDIA}/:challengeId`}
      component={UploadMedia}
    />
    <IsAuthUser exact path={CNST.ROUTES.SETTINGS} component={Settings} />
    <IsAuthUser exact path={CNST.ROUTES.DASHBOARD} component={Dashboard} />
    <IsAuthUser exact path={CNST.ROUTES.CREATE_CHALLENGE} component={CreateChallenge} />
    <IsAuthUser exact path={CNST.ROUTES.INVITATION} component={Invitation} />
    <IsAuthUser
      exact
      path={CNST.ROUTES.INVITATION_OPTIONS}
      component={InvitationOptions}
    />
    <IsAuthUser exact path={CNST.ROUTES.INVITE_BY_NAME} component={InviteByName} />
  </Switch>
);

export default AppRouter;
