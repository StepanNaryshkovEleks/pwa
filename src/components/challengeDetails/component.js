import React from "react";
import styles from "./_.module.css";
import {Link} from "react-router-dom";
import videoCamera from "../../images/video-camera-white.svg";
import voteIcon from "../../images/vote-white.svg";
import voteIconBlack from "../../images/vote.svg";
import CNST from "../../constants";
import base64ToHexString from "../../helpers/base64ToHexString";

export const ChallengeDetails = ({data, type, actorId}) => {
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

  const INVITES_CONTENT = () => (
    <Link
      className={styles.challenge}
      to={{
        pathname: `${CNST.ROUTES.CHALLENGE}/${base64ToHexString(
          challengeReference.challengeId
        )}`,
        state: {challengeId: challengeReference.challengeId},
      }}
    >
      <header className={styles.header}>
        <span className={styles.id}>{challengeReference.challengeId}</span>
      </header>
      <span className={styles.name}>{challengeName}</span>
      <span className={styles.description}>{challengeDescription}</span>
    </Link>
  );

  const REJECTED_CONTENT = () => (
    <span className={styles.challenge}>
      <header className={styles.header}>
        <span className={styles.id}>{challengeReference.challengeId}</span>
        <span className={styles.rejected}>Rejected</span>
      </header>
      <span className={styles.name}>{challengeName}</span>
      <span className={styles.description}>{challengeDescription}</span>
    </span>
  );

  const ACTIVE_CONTENT = () => (
    <span className={styles.challenge}>
      <header className={styles.header}>
        <span className={styles.id}>{challengeReference.challengeId}</span>
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
            .participantRole === "OBSERVER" && (
            <Link to={"/"} className="link link--primary link--small">
              <img className={styles.btnImg} src={voteIcon} />
              Vote
            </Link>
          )}
        {indx >= 0 &&
          indxInVoting !== -1 &&
          data.challengePotential.challengeState.participantArray[indx]
            .participantRole === "OBSERVER" && (
            <Link to={"/"} className="link link--secondary link--bordered link--small">
              <img className={styles.btnImg} src={voteIconBlack} />
              Voted
            </Link>
          )}
      </header>
      <span className={styles.name}>{challengeName}</span>
      <span className={styles.description}>{challengeDescription}</span>
    </span>
  );

  const CREATED_CONTENT = () => (
    <span className={styles.challenge}>
      <header className={styles.header}>
        <span className={styles.id}>{challengeReference.challengeId} (Created)</span>
        {data.challengePotential.challengeState.selectParticipantEntryArray.length >
          0 && <span className={styles.endeded}>Endeded</span>}
      </header>
      <span className={styles.name}>{challengeName}</span>
      <span className={styles.description}>{challengeDescription}</span>
    </span>
  );

  return type === CNST.CHALLENGE.INVITES
    ? INVITES_CONTENT()
    : type === CNST.CHALLENGE.REJECTED
    ? REJECTED_CONTENT()
    : type === CNST.CHALLENGE.ACTIVE
    ? ACTIVE_CONTENT()
    : CREATED_CONTENT();
};
