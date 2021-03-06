import React from "react";
import Header from "../../components/header";
import styles from "./_.module.css";
import {Link} from "react-router-dom";
import {Switch} from "antd";
import {useHistory} from "react-router-dom";

import userImg from "../../images/user.png";
import closeIcon from "../../images/close.svg";
import interestsIcon from "../../images/my-interests.svg";
import friendsIcon from "../../images/my-friends.svg";
import permissionsIcon from "../../images/permissions.svg";
import privateModeIcon from "../../images/private-mode.svg";
import rulesIcon from "../../images/our-rules.svg";
import privacyIcon from "../../images/privacy.svg";
import logoutIcon from "../../images/logout.svg";
import Setting from "../../components/settings";
import CNST from "../../constants";

const CloseIcon = ({className, onClick}) => (
  <button className={styles.backButton} onClick={onClick}>
    <img src={closeIcon} alt="Back" className={className} />
  </button>
);

const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

const SwitchComponent = () => <Switch defaultChecked />;

export const Settings = ({signOut, realmToken}) => {
  const history = useHistory();

  return (
    <>
      <Header
        title="Settings"
        LeftComponent={(props) => CloseIcon({...props, onClick: () => history.goBack()})}
        RightComponent={(props) => UserImage({...props, userImg})}
      />
      <main className={styles.main}>
        <Link to={CNST.ROUTES.PROFILE}>
          <Setting icon={userImg} iconStyles={styles.profileImg} title="Edit Profile" />
        </Link>
        <Link to="/">
          <Setting icon={interestsIcon} title="My Interests" />
        </Link>
        <Link to="/">
          <Setting icon={friendsIcon} title="My Friends" />
        </Link>
        <Link to="/">
          <Setting icon={permissionsIcon} title="Permissions" />
        </Link>
        <Setting
          icon={privateModeIcon}
          title="Private Mode"
          RightComponent={SwitchComponent}
        />
        <Link to="/">
          <Setting icon={rulesIcon} title="Our Rules" />
        </Link>
        <Link to="/">
          <Setting icon={privacyIcon} title="Privacy" />
        </Link>
        <button className={styles.button} onClick={() => signOut(realmToken)}>
          <Setting icon={logoutIcon} title="Log Out" />
        </button>
      </main>
    </>
  );
};
