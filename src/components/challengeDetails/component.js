import React from "react";
import styles from "./_.module.css";
import {Link} from "react-router-dom";
import {Button} from "antd";

import actionIcon from "../../images/add-user-white.svg";

export const ChallengeDetails = ({data}) => {
  const {challengeName, challengeDescription, challengeId} = data;

  return (
    <section className={styles.challenge}>
      <header className={styles.header}>
        <Link to="/">
          <span className={styles.id}>{challengeId}</span>
        </Link>
        <Button type="primary">
          <img className={styles.btnImg} src={actionIcon} alt="Action" />
          Some Action
        </Button>
      </header>
      <span className={styles.name}>{challengeName}</span>
      <span className={styles.description}>{challengeDescription}</span>
    </section>
  );
};
