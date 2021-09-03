import React, {useEffect, useState, createRef} from "react";
import Search from "../../components/search";
import {Button} from "antd";
import styles from "./_.module.css";
import findEntryId from "./../../helpers/findEntryId";
import getVotes from "./../../helpers/getVotes";
import isVoted from "./../../helpers/isVoted";
import voteIcon from "../../images/vote.svg";
import votedIcon from "../../images/voted.svg";
import addUser from "../../images/add-user-white.svg";
import userImg from "../../images/user.png";
import {EllipsisOutlined, TrophyFilled} from "@ant-design/icons";
import getWInner from "../../helpers/getWInner";
import ChallengeActivities from "../challenge-activities";

export const Challengers = ({
  challenge,
  challengeId,
  isChallengeOwner,
  role,
  voteChallenge,
  actorId,
  submitChallengeWinner,
}) => {
  const [search, setSearch] = useState("");
  const [activeRow, setActiveRow] = useState("");
  const [showMedia, setShowMedia] = useState(false);

  const isThereWinner = !!challenge?.challengeState?.selectParticipantEntryArray.length;
  const mediaDetails = challenge
    ? challenge.challengeState.striveParticipantEntryArray
        .filter((file) =>
          file.details
            ? file.details.actorHandle.assetId.id
                .toLowerCase()
                .includes(search.toLowerCase())
            : true
        )
        .sort((a, b) => {
          const entryId = findEntryId(
            challenge.challengeState.striveParticipantEntryArray,
            a.striveMediaId.id
          );
          const isFileVoted = isVoted(
            challenge.challengeState.voteParticipantEntryArray,
            entryId,
            actorId
          );
          return isFileVoted ? -1 : 0;
        })
    : [];
  const challengeOwnerId =
    challenge?.challengeState.challengeDefinition.challengeOwnerHandle.actorId;
  const refs = mediaDetails.map(() => createRef());

  useEffect(() => {
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current.pause(); // this hack needs for mobile safari which does not show first frame
      }
    });
  }, [refs]);

  return (
    <main className={styles.main}>
      {showMedia && (
        <div className={styles.singleMedia} onClick={() => setShowMedia(false)}>
          <ChallengeActivities
            mediaDetails={showMedia}
            singleView
            actorId={actorId}
            role={role}
            isOwner={isChallengeOwner}
            challengeId={challengeId}
            onClose={() => setShowMedia(false)}
          />
        </div>
      )}
      <Search value={search} setValue={setSearch} />
      <div>
        {mediaDetails &&
          mediaDetails.map((file, i) => {
            const winnerName = getWInner(challenge.challengeState);
            const entryId = findEntryId(mediaDetails, file.striveMediaId.id);
            const shouldBlockVote = isVoted(
              challenge.challengeState.voteParticipantEntryArray,
              entryId,
              actorId
            );
            const isWinnerRow =
              file.details && winnerName === file.details.actorHandle.assetId.id;
            const isActive = file.striveMediaId.id === activeRow;
            const indxInVoting = challenge.challengeState.voteParticipantEntryArray.findIndex(
              (el) => el.participantId === actorId
            );

            return (
              <div
                className={`${styles.wrap} ${
                  isActive || isWinnerRow ? styles.wrapActive : ""
                }`}
                key={file.striveMediaId.id}
              >
                <div className={styles.challenger}>
                  <img src={userImg} alt="User" className={styles.userImg} />
                  <div className={styles.challengerInfo}>
                    <span className={styles.userName}>
                      {file.details ? file.details.actorHandle.assetId.id : ""}
                    </span>
                    <span className={styles.votes}>
                      {getVotes(
                        challenge.challengeState.striveParticipantEntryArray,
                        file.striveMediaId.id
                      )}{" "}
                      votes
                    </span>
                  </div>
                  <div
                    className={`${styles.mediaContainer} ${
                      shouldBlockVote ? styles.mediaContainerSmall : ""
                    }`}
                    onClick={() => setShowMedia([file])}
                  >
                    {file.mediaFile &&
                      (file.mediaType.mime.includes("video") ? (
                        <video
                          playsInline
                          className={styles.media}
                          muted
                          preload="metadata"
                          autoPlay
                          ref={refs[i]}
                        >
                          <source src={URL.createObjectURL(file.mediaFile)} />
                        </video>
                      ) : (
                        <img
                          className={styles.media}
                          src={URL.createObjectURL(file.mediaFile)}
                          alt="Content"
                        />
                      ))}
                  </div>
                  {file.details && winnerName === file.details.actorHandle.assetId.id && (
                    <span className={styles.trophy}>
                      <TrophyFilled />
                    </span>
                  )}
                  {!isChallengeOwner && role !== "CHALLENGER" && (
                    <Button
                      disabled={!shouldBlockVote && indxInVoting !== -1}
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
                    >
                      {shouldBlockVote ? (
                        <img src={votedIcon} alt="Voted" className={styles.voteIcon} />
                      ) : (
                        <img src={voteIcon} alt="Vote" className={styles.voteIcon} />
                      )}
                      <span className={styles.voteWording}>
                        {shouldBlockVote ? "Voted" : "Vote"}
                      </span>
                    </Button>
                  )}
                  {isChallengeOwner && !winnerName && !isThereWinner && (
                    <span onClick={() => setActiveRow(file.striveMediaId.id)}>
                      <EllipsisOutlined />
                    </span>
                  )}
                </div>
                {isActive && !isThereWinner && (
                  <Button
                    type="primary"
                    className={styles.winnerBtn}
                    onClick={() =>
                      submitChallengeWinner({
                        challengeId,
                        participantId: challengeOwnerId,
                        selectEntryId: {
                          id: entryId,
                        },
                      })
                    }
                  >
                    <img src={addUser} />
                    Confirm the Winner
                  </Button>
                )}
              </div>
            );
          })}
      </div>
    </main>
  );
};
