import React from "react";
import styles from "./_.module.css";
import {Link} from "react-router-dom";
import CNST from "../../constants";
import {getRandomImage} from "../../helpers/getRandomImage.js";
import getWInner from "../../helpers/getWInner";

import userImg from "../../images/user.png";
import dotsIcon from "../../images/dots.svg";
import voteIcon from "../../images/vote.svg";

export const Challenge = ({data, challengeIndex, userId}) => {
  const {
    challengeName,
    challengeDescription,
    challengeOwnerHandle,
    challengeReference,
  } = data.challengeDefinition;

  const challengeImg = getRandomImage(challengeIndex);
  const winnerName = getWInner(data);
  const isObserver = data.participantArray.find(
    (challenger) =>
      challenger.participantId === userId &&
      challenger.participantRole === "OBSERVER" &&
      challenger.participantStatus === "ENGAGED"
  );

  return (
    <section className={styles.challenge}>
      <header className={styles.header}>
        <img src={userImg} alt="User" className={styles.userImg} />
        <span className={styles.username}>{challengeOwnerHandle.assetId.id}</span>
        <img src={dotsIcon} alt="More" />
      </header>
      <img src={challengeImg} alt="Challenge" className={styles.challengeImg} />
      <div className={styles.footer}>
        <div className={styles.votesContainer}>
          <span className={styles.id}>{challengeReference.challengeId}</span>
          {winnerName && (
            <>
              <img src={userImg} alt="Winner" className={styles.winnerImg} />
              <span className={styles.winnerName}>{winnerName} won the challenge</span>
            </>
          )}
          <span className={styles.votes}>
            {data.voteParticipantEntryArray.length} votes
          </span>
          {!winnerName && isObserver && (
            <button className={styles.button}>
              <img src={voteIcon} alt="Vote" />
            </button>
          )}
        </div>
        <span className={styles.name}>{challengeName}</span>
        <span className={styles.description}>{challengeDescription}</span>
      </div>
    </section>
  );
};
