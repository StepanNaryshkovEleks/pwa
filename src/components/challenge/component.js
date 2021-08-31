import React, {useEffect, useState} from "react";
import styles from "./_.module.css";
import {Result, Skeleton, Spin} from "antd";
import {getRandomImage} from "../../helpers/getRandomImage.js";
import getWInner from "../../helpers/getWInner";
import getWinnerMedia from "../../helpers/getWinnerMedia";
import {Link} from "react-router-dom";
import userImg from "../../images/user.png";
import voteIcon from "../../images/vote.svg";
import voteWhiteIcon from "../../images/vote-white.svg";
import CNST from "../../constants";
import base64ToHexString from "../../helpers/base64ToHexString";
import videoCamera from "../../images/video-camera-white.svg";

export const Challenge = ({
  getWinnerFile = () => {},
  mediaForClosedChallenges = {},
  data,
  challengeIndex,
  userId,
  to,
  isClosed = false,
  user = {},
}) => {
  const {
    challengeName,
    challengeDescription,
    challengeOwnerHandle,
    challengeReference,
  } = data.challengeDefinition;

  const currentMedia = isClosed
    ? mediaForClosedChallenges[challengeReference.challengeId]
    : false;

  useEffect(() => {
    if (
      currentMedia &&
      !currentMedia.isFetching &&
      !currentMedia.isFailed &&
      !currentMedia.file.mediaType
    ) {
      const winnerData = getWinnerMedia(data);
      getWinnerFile({
        securityToken: user.securityToken,
        challengeId: challengeReference.challengeId,
        challengeOwnerId: challengeOwnerHandle.actorId,
        mediaOwnerId: winnerData.participantId,
        mediaId: winnerData.striveMediaId.id,
      });
    }
  }, [currentMedia, data, challengeReference, challengeOwnerHandle, user, getWinnerFile]);

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
      {!isClosed && (
        <img src={challengeImg} alt="Challenge" className={styles.challengeImg} />
      )}
      {isClosed && !currentMedia.isFetching && currentMedia.isFailed && (
        <div className={styles.placeholder}>
          <Result status="warning" title="There are some problems with your operation." />
        </div>
      )}
      {isClosed && currentMedia.isFetching && (
        <div className={styles.placeholder}>
          <Spin tip="Loading..." />
          <Skeleton.Image active />
        </div>
      )}

      {isClosed &&
        currentMedia.file.mediaType &&
        (currentMedia.file.mediaType.mime.includes("video") ? (
          <video
            playsInline
            className={styles.challengeImg}
            muted
            loop
            preload="metadata"
            autoPlay
          >
            <source src={URL.createObjectURL(currentMedia.file.metadata)} />
          </video>
        ) : (
          <img
            src={URL.createObjectURL(currentMedia.file.metadata)}
            alt="Challenge"
            className={styles.challengeImg}
          />
        ))}
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
