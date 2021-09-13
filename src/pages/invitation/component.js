import React from "react";
import styles from "./_.module.css";
import {Helmet} from "react-helmet";
import Header from "../../components/header";
import userImg from "../../images/user.png";
import {Link, useHistory} from "react-router-dom";
import Setting from "../../components/settings";
import {Button} from "antd";

import challengesIcon from "../../images/challenges.svg";
import friendsIcon from "../../images/my-friends.svg";
import CNST from "../../constants";

const UserImage = ({userImg, className}) => (
  <Link to={CNST.ROUTES.PROFILE}>
    <img src={userImg} alt="User" className={className} />
  </Link>
);

export const Invitation = ({inviteUsers, observers, challengers}) => {
  const history = useHistory();

  const handleSubmit = () => {
    inviteUsers({history});
  };

  return (
    <main className={styles.main}>
      <Helmet>
        <meta name="theme-color" content="#006DFF" />
      </Helmet>
      <Header
        classes={styles.wrap}
        title="Vee Challenge"
        RightComponent={(props) => UserImage({...props, userImg})}
      />
      <h1 className={styles.title}>Challenge Invitees</h1>
      <Link to={"/invitation-options/challengers"}>
        <Setting icon={challengesIcon} title={`Challengers (${challengers.length})`} />
      </Link>
      <Link to={"/invitation-options/audience"}>
        <Setting icon={friendsIcon} title={`Audience (${observers.length})`} />
      </Link>
      <Button
        type="primary"
        className={styles.next}
        onClick={handleSubmit}
        disabled={challengers.length === 0 && observers.length === 0}
      >
        Invite Users
      </Button>
    </main>
  );
};
