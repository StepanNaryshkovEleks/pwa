import React from "react";
import styles from "./_.module.css";
import {Link} from "react-router-dom";
import {Button} from "antd";

import actionIcon from "../../images/add-user-white.svg";
import CNST from "../../constants";
import base64ToHexString from "../../helpers/base64ToHexString";

export const ChallengeDetails = ({data, type}) => {
  const {
    challengeName,
    challengeDescription,
    challengeReference,
  } = data.challengePotential.challengeState.challengeDefinition;

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

  const CREATED_CONTENT = () => (
    <span className={styles.challenge}>
      <header className={styles.header}>
        <span className={styles.id}>{challengeReference.challengeId}</span>
        <Button type="primary">
          <img className={styles.btnImg} src={actionIcon} alt="Action" />
          Some Action
        </Button>
      </header>
      <span className={styles.name}>{challengeName}</span>
      <span className={styles.description}>{challengeDescription}</span>
    </span>
  );

  return type === CNST.CHALLENGE.INVITES ? INVITES_CONTENT() : CREATED_CONTENT();
};
