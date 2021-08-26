import React, {useEffect, useRef} from "react";
import styles from "./_.module.css";
import {Link} from "react-router-dom";
import videoCamera from "../../images/video-camera-white.svg";
import checkImg from "../../images/check-white.svg";
import crossImg from "../../images/cross-white.svg";
import voteIcon from "../../images/vote-white.svg";
import voteIconBlack from "../../images/vote.svg";
import CNST from "../../constants";
import base64ToHexString from "../../helpers/base64ToHexString";
import getWInner from "../../helpers/getWInner";
import userImg from "../../images/user.png";

export const ChallengeDetails = ({data, type, actorId, engageChallenge}) => {
  const componentRef = useRef();
  const {
    challengeName,
    challengeDescription,
    challengeReference,
  } = data.challengePotential.challengeState.challengeDefinition;
  const indx = data.challengePotential.challengeState.participantArray.findIndex(
    (el) => el.participantId === actorId
  );

  const indxInMedia = data.challengePotential.challengeState.striveParticipantEntryArray.findIndex(
    (el) => el.participantId === actorId
  );

  const indxInVoting = data.challengePotential.challengeState.voteParticipantEntryArray.findIndex(
    (el) => el.participantId === actorId
  );

  const onEngage = (participantStatus) => {
    engageChallenge({
      shouldRefreshChallenges: true,
      challengeReference: {challengeId: challengeReference.challengeId},
      participantRole:
        data.challengePotential.challengeState.participantArray[indx].participantRole,
      participantStatus,
    });
  };

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollLeft = 120;
    }
  }, [componentRef]);

  const INVITES_CONTENT = () => (
    <div className={styles.swipeContainer} ref={componentRef}>
      <div className={styles.swipe}>
        <button
          className={`${styles.btn} ${styles.btnAccepted}`}
          onClick={() => onEngage("ENGAGED")}
        >
          <div>
            <img src={checkImg} alt="" width="31" height="31" />
            Accept
          </div>
        </button>
        <Link
          className={`${styles.challenge} ${styles.challengeSwiped}`}
          to={{
            pathname: `${CNST.ROUTES.CHALLENGE}/${base64ToHexString(
              challengeReference.challengeId
            )}`,
            state: {challengeId: challengeReference.challengeId},
          }}
        >
          <header className={styles.header}>
            <span className={styles.id}>{challengeName}</span>
          </header>
          <span className={styles.name}>{challengeDescription}</span>
        </Link>
        <button
          onClick={() => onEngage("DISENGAGED")}
          className={`${styles.btn} ${styles.btnRejected}`}
        >
          <div>
            <img src={crossImg} alt="" width="31" height="31" />
            Reject
          </div>
        </button>
      </div>
    </div>
  );

  const REJECTED_CONTENT = () => (
    <span className={styles.challenge}>
      <header className={styles.header}>
        <span className={styles.id}>{challengeName}</span>
        <span className={styles.rejected}>Rejected</span>
      </header>
      <span className={styles.name}>{challengeDescription}</span>
    </span>
  );

  const ACTIVE_CONTENT = () => (
    <span className={styles.challenge}>
      <header className={styles.header}>
        <span className={styles.id}>{challengeName}</span>
        {indx >= 0 &&
          indxInMedia === -1 &&
          data.challengePotential.challengeState.participantArray[indx]
            .participantRole === "CHALLENGER" && (
            <Link
              to={{
                pathname: `${CNST.ROUTES.UPLOAD_MEDIA}/${base64ToHexString(
                  challengeReference.challengeId
                )}`,
                state: {challengeId: challengeReference.challengeId},
              }}
              className="link link--primary link--small"
            >
              <img className={styles.btnImg} src={videoCamera} />
              Add content
            </Link>
          )}
        {indx >= 0 &&
          indxInVoting === -1 &&
          data.challengePotential.challengeState.participantArray[indx]
            .participantRole === "OBSERVER" &&
          data.challengePotential.challengeState.striveParticipantEntryArray.length >
            0 && (
            <Link
              to={{
                pathname: CNST.ROUTES.CHALLENGE_SPECIFICS,
                state: {
                  challengeId: challengeReference.challengeId,
                  defaultTab: CNST.ROUTES.CHALLENGE_ACTIVITIES_TAB,
                  isOwner: false,
                  role:
                    data.challengePotential.challengeState.participantArray[indx]
                      .participantRole,
                },
              }}
              className="link link--primary link--small"
            >
              <img className={styles.btnImg} src={voteIcon} />
              Vote
            </Link>
          )}
        {indx >= 0 &&
          indxInVoting !== -1 &&
          data.challengePotential.challengeState.participantArray[indx]
            .participantRole === "OBSERVER" &&
          data.challengePotential.challengeState.striveParticipantEntryArray.length >
            0 && (
            <span className="link link--secondary link--bordered link--small">
              <img className={styles.btnImg} src={voteIconBlack} />
              Voted
            </span>
          )}
      </header>
      <span className={styles.name}>{challengeDescription}</span>
    </span>
  );

  const CREATED_CONTENT = () => {
    const winnerName = getWInner(data.challengePotential.challengeState);
    return (
      <Link
        className={styles.challenge}
        to={{
          pathname: CNST.ROUTES.CHALLENGE_SPECIFICS,
          state: {
            defaultTab: CNST.ROUTES.CHALLENGE_INFORMATION_TAB,
            role:
              data.challengePotential.challengeState.participantArray[indx]
                ?.participantRole,
            isOwner: true,
            challengeId: challengeReference.challengeId,
          },
        }}
      >
        <header className={styles.header}>
          <span className={styles.id}>{challengeName} (Created)</span>
          {winnerName && <span className={styles.endeded}>Ended</span>}
        </header>
        <span className={styles.name}>{challengeDescription}</span>
        {winnerName && (
          <div className={styles.winner}>
            <img src={userImg} alt="Winner" className={styles.winnerImg} />
            <span className={styles.winnerName}>{winnerName} won the challenge</span>
          </div>
        )}
      </Link>
    );
  };

  return type === CNST.CHALLENGE.INVITES
    ? INVITES_CONTENT()
    : type === CNST.CHALLENGE.REJECTED
    ? REJECTED_CONTENT()
    : type === CNST.CHALLENGE.ACTIVE
    ? ACTIVE_CONTENT()
    : CREATED_CONTENT();
};
