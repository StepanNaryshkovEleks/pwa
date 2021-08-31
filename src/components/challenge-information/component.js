import React from "react";
import {getRandomImage} from "../../helpers/getRandomImage.js";
import styles from "./_.module.css";

export const ChallengeInformation = ({challenge}) => {
  const challengeName = challenge?.challengeState.challengeDefinition.challengeName;
  const challengeDescription =
    challenge?.challengeState.challengeDefinition.challengeDescription;
  const challengeImg = getRandomImage(1);

  return (
    <>
      <img src={challengeImg} alt="Challenge" className={styles.challengeImg} />
      <div className={styles.challengeInfo}>
        <span className={styles.challengeName}>{challengeName}</span>
        <span className={styles.challengeDescription}>{challengeDescription}</span>
      </div>
    </>
  );
};
