import React from "react";
import styles from "./_.module.css";
import {getRandomImage} from "../../helpers/getRandomImage.js";
import getWInner from "../../helpers/getWInner";
import {Link} from "react-router-dom";
import userImg from "../../images/user.png";
import dotsIcon from "../../images/dots.svg";
import voteIcon from "../../images/vote.svg";
import voteWhiteIcon from "../../images/vote-white.svg";
import CNST from "../../constants";
import base64ToHexString from "../../helpers/base64ToHexString";
import videoCamera from "../../images/video-camera-white.svg";

export const Challenge = ({data, challengeIndex, userId, to}) => {
  const {
    challengeName,
    challengeDescription,
    challengeOwnerHandle,
    challengeReference,
  } = data.challengeDefinition;

  const indx = data.participantArray.findIndex((el) => el.participantId === userId);
  const indxInMedia = data.striveParticipantEntryArray.findIndex(
    (el) => el.participantId === userId
  );

  const indxInVoting = data.voteParticipantEntryArray.findIndex(
    (el) => el.participantId === userId
  );
  const challengeImg = getRandomImage(challengeIndex);
  const winnerName = getWInner(data);
  const isObserver = data.participantArray.find(
    (challenger) =>
      challenger.participantId === userId &&
      challenger.participantRole === "OBSERVER" &&
      challenger.participantStatus === "ENGAGED"
  );

  const Content = () => (
    <>
      <img src={challengeImg} alt="Challenge" className={styles.challengeImg} />
      <div className={styles.footer}>
        <div
          className={`${styles.votesContainer} ${
            winnerName ? styles.votesContainerClosed : ""
          }`}
        >
          <div
            className={`${styles.headerDesc} ${
              !winnerName ? styles.headerDescWithoutWinner : ""
            }`}
          >
            {winnerName && (
              <div className={styles.winWrap}>
                <img src={userImg} alt="Winner" className={styles.winnerImg} />
                <span className={styles.winnerName}>{winnerName} won the challenge</span>
              </div>
            )}
            <div className={styles.voteWrap}>
              <span className={styles.votes}>
                {data.voteParticipantEntryArray.length} votes
              </span>
              {!winnerName && isObserver && (
                <button className={styles.button}>
                  <img src={voteIcon} alt="Vote" />
                </button>
              )}
            </div>
          </div>
          <div
            className={`${
              winnerName ? styles.challengeDesc : styles.challengeDescWithoutWinner
            }`}
          >
            <span className={styles.name}>{challengeName}</span>
            <span className={styles.description}>{challengeDescription}</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <section className={styles.challenge}>
      <header className={styles.header}>
        <img src={userImg} alt="User" className={styles.userImg} />
        <span className={styles.username}>{challengeOwnerHandle.assetId.id}</span>
        {to &&
          indx >= 0 &&
          indxInVoting === -1 &&
          data.participantArray[indx].participantRole === "OBSERVER" &&
          data.striveParticipantEntryArray.length > 0 && (
            <Link
              to={{
                pathname: CNST.ROUTES.CHALLENGE_SPECIFICS,
                state: {
                  challengeId: challengeReference.challengeId,
                  role: data.participantArray[indx].participantRole,
                  defaultTab: CNST.ROUTES.CHALLENGE_ACTIVITIES_TAB,
                  isOwner: false,
                },
              }}
              className={`${styles.link} link link--primary link--small`}
            >
              <img className={styles.btnImg} src={voteWhiteIcon} />
              Go to vote
            </Link>
          )}
        {to &&
          indx >= 0 &&
          indxInMedia === -1 &&
          data.participantArray[indx].participantRole === "CHALLENGER" && (
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
      </header>
      {to ? (
        <Link to={to}>
          <Content />
        </Link>
      ) : (
        <Content />
      )}
    </section>
  );
};
