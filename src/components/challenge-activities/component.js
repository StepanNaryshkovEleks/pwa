import React from "react";
import {Carousel} from "antd";
import {EllipsisOutlined, CloseOutlined} from "@ant-design/icons";
import styles from "./_.module.css";

import userImg from "../../images/user.png";
import arrowIcon from "../../images/arrow-right.svg";
import voteIcon from "../../images/vote.svg";

export const ChallengeActivities = ({mediaFiles, singleView, onClose}) => {
  return (
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
            {singleView ? (
              <CloseOutlined
                className={styles.more}
                style={{color: "white"}}
                onClick={onClose}
              />
            ) : (
              <EllipsisOutlined className={styles.more} style={{color: "white"}} />
            )}
            <div className={styles.votes}>
              <span>155,186 votes</span>
              <button className={styles.voteBtn}>
                <img src={voteIcon} alt="Vote" />
              </button>
            </div>
            {i === 0 && !singleView && (
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
  );
};
