import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Challenge from "../../components/challenge";
import {Button} from "antd";
import {Link} from "react-router-dom";
import styles from "./_.module.css";

import cameraIcon from "../../images/video-camera-white.svg";
import crossIcon from "../../images/cross.svg";
import checkBlackIcon from "../../images/check-black.svg";
import checkWhiteIcon from "../../images/check-white.svg";
import backIcon from "../../images/chevron-left.svg";
import userImg from "../../images/user.png";
import CNST from "../../constants";
import base64ToHexString from "../../helpers/base64ToHexString";
import Spinner from "../../components/spinner";

const BackIcon = ({className, onClick}) => (
  <button className={styles.goBack} onClick={onClick}>
    <img src={backIcon} alt="Go back" className={className} />
  </button>
);

const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

export const ChallengePage = ({
  fetchChallenge,
  challenge,
  engageChallenge,
  user,
  location,
}) => {
  const challengeId = location.state.challengeId;
  const history = useHistory();
  const participant = challenge
    ? challenge.challengeState.participantArray.find(
        (el) => el.participantId === user.actorHandle.actorId
      )
    : {};

  useEffect(() => {
    fetchChallenge({challengeId});
  }, [fetchChallenge, challengeId]);

  if (!participant.participantStatus) {
    return <Spinner />;
  }

  const isInvited = participant.participantStatus === "INVITED";
  const isEngaged = participant.participantStatus === "ENGAGED";
  const isDisengaged = participant.participantStatus === "DISENGAGED";

  const onEngage = (participantStatus) => {
    engageChallenge({
      challengeReference: {challengeId},
      participantRole: participant.participantRole,
      participantStatus,
    });
  };

  return (
    <>
      <Header
        title="Vee Challenge"
        LeftComponent={(props) => BackIcon({...props, onClick: () => history.goBack()})}
        RightComponent={(props) => UserImage({...props, userImg})}
      />
      <main className={styles.main}>
        {challenge && (
          <Challenge
            data={challenge.challengeState}
            challengeIndex={1}
            userId={user.actorHandle.actorId}
          />
        )}
        <div
          className={`${styles.actionsBlock} ${isEngaged && styles.engaged} ${
            isDisengaged && styles.disengaged
          }`}
        >
          {isInvited && (
            <>
              <Button className={styles.rejectBtn} onClick={() => onEngage("DISENGAGED")}>
                <img className={styles.buttonImg} src={crossIcon} alt="Reject" />
                Reject Challenge
              </Button>
              <Button type="primary" onClick={() => onEngage("ENGAGED")}>
                <img className={styles.buttonImg} src={checkWhiteIcon} alt="Accept" />
                Accept Challenge
              </Button>
            </>
          )}
          {isEngaged && (
            <>
              <span className={styles.status}>
                <img className={styles.buttonImg} src={checkBlackIcon} alt="Accepted" />
                Challenge Accepted
              </span>
              {participant.participantRole === "CHALLENGER" && (
                <Link
                  to={{
                    pathname: `${CNST.ROUTES.UPLOAD_MEDIA}/${base64ToHexString(
                      challengeId
                    )}`,
                    state: {challengeId},
                  }}
                >
                  <Button type="primary">
                    <img
                      className={styles.buttonImg}
                      src={cameraIcon}
                      alt="Submit Entry"
                    />
                    Submit Entry
                  </Button>
                </Link>
              )}
            </>
          )}
          {isDisengaged && (
            <>
              <span className={styles.status}>
                <img className={styles.buttonImg} src={crossIcon} alt="Rejected" />
                Challenge Rejected
              </span>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
