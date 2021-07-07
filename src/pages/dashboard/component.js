import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {Link} from "react-router-dom";
import CNST from "../../constants";
import settingsIcon from "../../images/settings.svg";

const SettingsIcon = ({className}) => (
  <Link to={CNST.ROUTES.SETTINGS}>
    <img src={settingsIcon} alt="Settings" className={className} />
  </Link>
);

const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

export const Dashboard = ({userImg}) => {
  return (
    <>
      <Header
        title="Welcome to Vee"
        LeftComponent={SettingsIcon}
        RightComponent={(props) => UserImage({...props, userImg})}
      />
      <Footer />
    </>
  );
};
