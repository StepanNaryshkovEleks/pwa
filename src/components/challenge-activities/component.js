import React from "react";
import {Carousel} from "antd";
import styles from "./_.module.css";

import userImg from "../../images/user.png";
import arrowIcon from "../../images/arrow-right.svg";
import moreIcon from "../../images/dots-white.svg";
import voteIcon from "../../images/vote.svg";

export const ChallengeActivities = ({challenge}) => {
  const mediaFiles = challenge?.mediaFiles ? challenge.mediaFiles : [];

  return (
    <>
      <Carousel>
        {mediaFiles &&
          mediaFiles.map((file, i) => (
            <div className={styles.challenger} key={file.details.mediaId.id}>
              {file.mediaType.mime.includes("video") ? (
                <video
                  playsInline
                  className={styles.media}
                  id="videoId"
                  src={URL.createObjectURL(file.mediaFile)}
                  muted
                  autoPlay
                  loop
                  type="video/mp4"
                />
              ) : (
                <img
                  className={styles.media}
                  src={URL.createObjectURL(file.mediaFile)}
                  alt="Content"
                />
              )}
              <div className={styles.user}>
                <img src={userImg} alt="User" className={styles.userImg} />
                <span className={styles.userName}>
                  {file.details.actorHandle.assetId.id}
                </span>
              </div>
              <img src={moreIcon} alt="More" className={styles.more} />
              <div className={styles.votes}>
                <span>155,186 votes</span>
                <button className={styles.voteBtn}>
                  <img src={voteIcon} alt="Vote" />
                </button>
              </div>
              {i === 0 && (
                <div className={styles.tip}>
                  <span className={styles.tipText}>
                    Swipe to
                    <br />
                    next video
                  </span>
                  <img src={arrowIcon} alt="Swipe" />
                </div>
              )}
            </div>
          ))}
      </Carousel>
    </>
  );
};
