import React, {useEffect, useState} from "react";
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
  fetchChallenge,
  challenge,
  challengeId,
  isOwner,
  role,
  voteChallenge,
  actorId,
  shouldFetchChallenge,
  submitChallengeWinner,
}) => {
  const [search, setSearch] = useState("");
  const [activeRow, setActiveRow] = useState("");
  const [showMedia, setShowMedia] = useState(false);

  const isThereWinner = !!challenge?.challengeState?.selectParticipantEntryArray.length;
  const mediaDetails = challenge?.challengeState.striveParticipantEntryArray;
  const challengeOwnerId =
    challenge?.challengeState.challengeDefinition.challengeOwnerHandle.actorId;
  const mediaFiles = challenge?.mediaFiles
    ? challenge.mediaFiles.filter((file) =>
        file.details.actorHandle.assetId.id.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  useEffect(() => {
    // works after voting
    if (shouldFetchChallenge) {
      fetchChallenge({challengeId});
    }
  }, [shouldFetchChallenge, fetchChallenge, challengeId]);

  return (
    <main className={styles.main}>
      {showMedia ? (
        <div>
          <div className={styles.background} onClick={() => setShowMedia(false)} />
          <ChallengeActivities
            mediaFiles={showMedia}
            singleView
            onClose={() => setShowMedia(false)}
          />
        </div>
      ) : (
        <>
          <Search value={search} setValue={setSearch} />
          <div className={styles.challengers}>
            {mediaFiles &&
              mediaFiles.map((file) => {
                const winnerName = getWInner(challenge.challengeState);
                const entryId = findEntryId(mediaDetails, file.details.mediaId.id);
                const shouldBlockVote = isVoted(
                  challenge.challengeState.voteParticipantEntryArray,
                  entryId,
                  actorId
                );
                const isWinnerRow = winnerName === file.details.actorHandle.assetId.id;
                const isActive = file.details.mediaId.id === activeRow;
                const indxInVoting = challenge.challengeState.voteParticipantEntryArray.findIndex(
                  (el) => el.participantId === actorId
                );

                return (
                  <div
                    className={`${styles.wrap} ${
                      isActive || isWinnerRow ? styles.wrapActive : ""
                    }`}
                    key={file.details.mediaId.id}
                  >
                    <div className={styles.challenger}>
                      <img src={userImg} alt="User" className={styles.userImg} />
                      <div className={styles.challengerInfo}>
                        <span className={styles.userName}>
                          {file.details.actorHandle.assetId.id}
                        </span>
                        <span className={styles.votes}>
                          {getVotes(
                            challenge.challengeState.striveParticipantEntryArray,
                            file.details.mediaId.id
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
                        {file.mediaType.mime.includes("video") ? (
                          <video
                            playsInline
                            className={styles.media}
                            id="videoId"
                            src={URL.createObjectURL(file.mediaFile)}
                            muted
                            type="video/mp4"
                          />
                        ) : (
                          <img
                            className={styles.media}
                            src={URL.createObjectURL(file.mediaFile)}
                            alt="Content"
                          />
                        )}
                      </div>
                      {winnerName === file.details.actorHandle.assetId.id && (
                        <span className={styles.trophy}>
                          <TrophyFilled />
                        </span>
                      )}
                      {!isOwner && role !== "CHALLENGER" && (
                        <Button
                          onClick={() =>
                            !shouldBlockVote && indxInVoting === -1
                              ? voteChallenge({
                                  actorId,
                                  challengeReference: {challengeId},
                                  voteEntryId: entryId,
                                  shouldFetchChallenge: true,
                                })
                              : {}
                          }
                        >
                          {shouldBlockVote ? (
                            <img
                              src={votedIcon}
                              alt="Voted"
                              className={styles.voteIcon}
                            />
                          ) : (
                            <img src={voteIcon} alt="Vote" className={styles.voteIcon} />
                          )}
                          <span className={styles.voteWording}>
                            {shouldBlockVote ? "Voted" : "Vote"}
                          </span>
                        </Button>
                      )}
                      {isOwner && !winnerName && !isThereWinner && (
                        <span onClick={() => setActiveRow(file.details.mediaId.id)}>
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
        </>
      )}
    </main>
  );
};
