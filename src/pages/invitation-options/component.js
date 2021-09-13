import React from "react";
import styles from "./_.module.css";
import {Helmet} from "react-helmet";
import Header from "../../components/header";
import userImg from "../../images/user.png";
import {Link, useParams, useHistory} from "react-router-dom";
import Setting from "../../components/settings";
import {Switch, notification} from "antd";

import chevronLeft from "../../images/chevron-left-white.svg";
import friendsIcon from "../../images/my-friends.svg";
import globalIcon from "../../images/global.svg";
import discoverIcon from "../../images/discover.svg";
import contactsIcon from "../../images/contacts.svg";
import CNST from "../../constants";

const openNotification = () => {
  notification.info({
    message: "It is not a part of the prototype",
    placement: "topLeft",
  });
};

const SettingsIcon = ({className, onClick}) => (
  <button className={styles.backButton} onClick={onClick}>
    <img src={chevronLeft} alt="Back" className={className} />
  </button>
);

const UserImage = ({userImg, className}) => (
  <Link to={CNST.ROUTES.PROFILE}>
    <img src={userImg} alt="User" className={className} />
  </Link>
);

const SwitchComponent = () => <Switch />;

export const InvitationOptions = ({challenge}) => {
  const {invitationType} = useParams();
  const history = useHistory();
  const id = challenge.challengeReference ? challenge.challengeReference.challengeId : "";

  return (
    <main className={styles.main}>
      <Helmet>
        <meta name="theme-color" content="#006DFF" />
      </Helmet>
      <Header
        classes={styles.wrap}
        title="Vee Challenge"
        LeftComponent={(props) =>
          SettingsIcon({...props, onClick: () => history.goBack()})
        }
        RightComponent={(props) => UserImage({...props, userImg})}
      />
      <h1 className={styles.title}>{invitationType}</h1>
      <Setting
        icon={friendsIcon}
        title="My friends"
        RightComponent={SwitchComponent}
        onClick={openNotification}
      />
      <Setting
        icon={globalIcon}
        title="Global audience"
        RightComponent={SwitchComponent}
        onClick={openNotification}
      />
      <Link to={`/invite-by-name/${invitationType}`}>
        <Setting icon={discoverIcon} title="Invite By Name" />
      </Link>
      <Setting
        icon={contactsIcon}
        title="Invite From Contacts"
        onClick={openNotification}
      />
    </main>
  );
};
