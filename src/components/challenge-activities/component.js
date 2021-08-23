import React from "react";
import {Carousel} from "antd";
import {EllipsisOutlined, CloseOutlined} from "@ant-design/icons";
import styles from "./_.module.css";

import userImg from "../../images/user.png";
import arrowIcon from "../../images/arrow-right.svg";
import voteIcon from "../../images/vote.svg";
import votedIcon from "../../images/voted.svg";
import getVotes from "../../helpers/getVotes";
import isVoted from "../../helpers/isVoted";
import findEntryId from "../../helpers/findEntryId";

export const ChallengeActivities = ({
  challengeId,
  voteChallenge,
  mediaFiles,
  singleView,
  onClose,
  challenge,
  actorId,
}) => {
  return (
    <Carousel>
      {mediaFiles &&
        mediaFiles.map((file, i) => {
          const indxInVoting = challenge.challengeState.voteParticipantEntryArray.findIndex(
            (el) => el.participantId === actorId
          );
          const entryId = findEntryId(
            challenge.challengeState.striveParticipantEntryArray,
            file.details.mediaId.id
          );
          const isMyFile = actorId === file.details.actorHandle.actorId;
          const shouldBlockVote = isVoted(
            challenge.challengeState.voteParticipantEntryArray,
            entryId,
            actorId
          );

          return (
            <div
              className={styles.challenger}
              key={file.details.mediaId.id}
              onClick={(e) => e.stopPropagation()}
            >
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
                <span>
                  {getVotes(
                    challenge.challengeState.striveParticipantEntryArray,
                    file.details.mediaId.id
                  )}{" "}
                  votes
                </span>
                <button
                  onClick={() =>
                    !shouldBlockVote && indxInVoting === -1 && !isMyFile
                      ? voteChallenge({
                          actorId,
                          mediaOwnerId: file.details.actorHandle.actorId,
                          striveMediaId: file.details.mediaId.id,
                          challengeReference: {challengeId},
                          voteEntryId: entryId,
                        })
                      : {}
                  }
                  className={styles.voteBtn}
                >
                  {shouldBlockVote ? (
                    <img src={votedIcon} alt="Voted" height={24} />
                  ) : (
                    <img src={voteIcon} alt="Vote" />
                  )}
                </button>
              </div>
              {i === 0 && mediaFiles.length > 1 && (
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
          );
        })}
    </Carousel>
  );
};
