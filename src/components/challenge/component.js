import React from "react";
import styles from "./_.module.css";
import {Link} from "react-router-dom";
import CNST from "../../constants";
import {getRandomImage} from "../../helpers/getRandomImage.js";

import userImg from "../../images/user.png";
import dotsIcon from "../../images/dots.svg";
import voteIcon from "../../images/vote.svg";

export const Challenge = ({isOpen = true, data}) => {
  const {name, description, username} = data;
  const challengeImg = getRandomImage();

  return (
    <section className={styles.challenge}>
      <header className={styles.header}>
        <img src={userImg} alt="User" className={styles.userImg} />
        <span className={styles.username}>{username}</span>
        <img src={dotsIcon} alt="More" />
      </header>
      <img src={challengeImg} alt="Challenge" className={styles.challengeImg} />
      <Link to={CNST.ROUTES.HOME}>
        <div className={styles.footer}>
          <div className={styles.votesContainer}>
            <span className={styles.id}>#100245</span>
            {!isOpen && (
              <>
                <img src={userImg} alt="Winner" className={styles.winnerImg} />
                <span className={styles.winnerName}>Loulou won the challenge</span>
              </>
            )}
            <span className={styles.votes}>155345 votes</span>
            {isOpen && (
              <button className={styles.button}>
                <img src={voteIcon} alt="Vote" />
              </button>
            )}
          </div>
          <span className={styles.name}>{name}</span>
          <span className={styles.description}>{description}</span>
          <span>#adidassuperfly #chapionsleaguefinal</span>
        </div>
      </Link>
    </section>
  );
};
