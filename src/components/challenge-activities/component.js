import React from "react";
import Media from "../media";
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
  mediaDetails,
  mediaFiles,
  singleView,
  onClose,
  challenge,
  actorId,
  role,
}) => {
  return (
    <Carousel>
      {mediaDetails &&
        mediaDetails.map((file, i) => {
          const media = mediaFiles[file.striveMediaId.id] || {};
          const indxInVoting = challenge.challengeState.voteParticipantEntryArray.findIndex(
            (el) => el.participantId === actorId
          );
          const entryId = findEntryId(
            challenge.challengeState.striveParticipantEntryArray,
            file.striveMediaId.id
          );
          const shouldBlockVote = isVoted(
            challenge.challengeState.voteParticipantEntryArray,
            entryId,
            actorId
          );

          return (
            <div
              className={styles.challenger}
              key={file.striveMediaId.id}
              onClick={(e) => e.stopPropagation()}
            >
              <Media file={media} />
              <div className={styles.user}>
                <img src={userImg} alt="User" className={styles.userImg} />
                <span className={styles.userName}>
                  {media.details ? media.details.actorHandle.assetId.id : ""}
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
                <span className={styles.votesCount}>
                  {getVotes(
                    challenge.challengeState.striveParticipantEntryArray,
                    file.striveMediaId.id
                  )}{" "}
                  votes
                </span>
                {role === "OBSERVER" && (shouldBlockVote || indxInVoting === -1) && (
                  <button
                    onClick={() =>
                      !shouldBlockVote && indxInVoting === -1
                        ? voteChallenge({
                            actorId,
                            mediaOwnerId: file.participantId,
                            striveMediaId: file.striveMediaId.id,
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
                )}
              </div>
              {i === 0 && mediaDetails.length > 1 && (
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
