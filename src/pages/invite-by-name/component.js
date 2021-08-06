import React, {useEffect, useState} from "react";
import styles from "./_.module.css";
import {Helmet} from "react-helmet";
import Header from "../../components/header";
import Search from "../../components/search";
import {Button} from "antd";
import {useHistory, useParams} from "react-router-dom";

import userImg from "../../images/user.png";
import backIcon from "../../images/chevron-left-white.svg";
import inviteUserIcon from "../../images/add-user-white.svg";
import uninviteUserIcon from "../../images/add-user-black.svg";

const SettingsIcon = ({className, onClick}) => (
  <button className={styles.backButton} onClick={onClick}>
    <img src={backIcon} alt="Back" className={className} />
  </button>
);

const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

export const InviteByName = ({
  fetchChallenge,
  challenge = {},
  fetching,
  observers,
  challengers,
  inviteUser,
  uninviteUser,
}) => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [isFetched, setFetched] = useState(false);
  const {invitationType} = useParams();
  const isAudience = invitationType === "audience";
  const invitedlist = isAudience ? observers : challengers;
  const notAllowedToInvite = isAudience ? challengers : observers;
  const users = challenge.inviteParticipantsAction
    ? challenge.inviteParticipantsAction.participantArray.filter(
        (user) =>
          !notAllowedToInvite.includes(user.participantId) &&
          user.participantName.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (!isFetched && !challenge.inviteParticipantsAction) {
      setFetched(true);
      fetchChallenge({challengeId: challenge.challengeReference.challengeId});
    }
  }, [isFetched, challenge, fetchChallenge]);

  return (
    <main className={styles.main}>
      <Helmet>
        <meta name="theme-color" content="#006DFF" />
      </Helmet>
      <Header
        classes={styles.wrap}
        title="Invite by Name"
        LeftComponent={(props) =>
          SettingsIcon({...props, onClick: () => history.goBack()})
        }
        RightComponent={(props) => UserImage({...props, userImg})}
      />
      <Search value={search} setValue={setSearch} />
      {users &&
        users.map((user, i) => {
          const isInvited = invitedlist.includes(user.participantId);
          return (
            <div className={styles.user} key={i}>
              <img src={userImg} alt="User" className={styles.userImg} />
              <span className={styles.userName}>{user.participantName}</span>
              <Button
                type="primary"
                onClick={() =>
                  isInvited
                    ? uninviteUser(user.participantId)
                    : inviteUser(user.participantId)
                }
                className={isInvited && styles.invited}
              >
                <img
                  src={isInvited ? uninviteUserIcon : inviteUserIcon}
                  alt={"Invite"}
                  className={styles.inviteImg}
                />
                {isInvited ? "Uninvite" : "Invite"}
              </Button>
            </div>
          );
        })}
    </main>
  );
};
