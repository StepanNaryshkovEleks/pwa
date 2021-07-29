import React from "react";
import styles from "./_.module.css";
import {Helmet} from "react-helmet";
import Header from "../../components/header";
import userImg from "../../images/user.png";
import {Link, useParams, useHistory} from "react-router-dom";
import Setting from "../../components/settings";
import {Switch, Button} from "antd";

import chevronLeft from "../../images/chevron-left-white.svg";
import friendsIcon from "../../images/my-friends.svg";
import globalIcon from "../../images/global.svg";
import discoverIcon from "../../images/discover.svg";
import contactsIcon from "../../images/contacts.svg";

const SettingsIcon = ({className, onClick}) => (
  <button className={styles.backButton} onClick={onClick}>
    <img src={chevronLeft} alt="Back" className={className} />
  </button>
);

const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

const SwitchComponent = () => <Switch />;

export const Invitation = ({inviteUsers, challenge, observers, challengers}) => {
  const {invitationType} = useParams();
  const history = useHistory();
  const isAudience = invitationType === "audience";
  const invitedlist = isAudience ? observers : challengers;

  const handleSubmit = () => {
    isAudience ? history.push("/invitation/challengers") : inviteUsers({history});
  };

  return (
    <main className={styles.main}>
      <Helmet>
        <meta name="theme-color" content="#006DFF" />
      </Helmet>
      <Header
        classes={styles.wrap}
        title={`Vee Challenge ${
          challenge ? challenge.challengeReference.challengeId : ""
        }`}
        LeftComponent={(props) =>
          !isAudience && SettingsIcon({...props, onClick: () => history.goBack()})
        }
        RightComponent={(props) => UserImage({...props, userImg})}
      />
      <h1 className={styles.title}>{invitationType}</h1>
      <Setting icon={friendsIcon} title="My friends" RightComponent={SwitchComponent} />
      <Setting
        icon={globalIcon}
        title="Global audience"
        RightComponent={SwitchComponent}
      />
      <Link to={`/users-invitation/${invitationType}`}>
        <Setting icon={discoverIcon} title="Invite By Name" />
      </Link>
      <Link to="/">
        <Setting
          lassName={styles.link}
          icon={contactsIcon}
          title="Invite From Contacts"
        />
      </Link>
      <Button
        type="primary"
        className={styles.next}
        onClick={handleSubmit}
        disabled={invitedlist.length === 0}
      >
        Add {invitationType}
      </Button>
    </main>
  );
};
