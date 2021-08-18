import React, {useEffect, useState} from "react";
import Search from "../../components/search";
import {Button} from "antd";
import Spinner from "../spinner";
import styles from "./_.module.css";
import findEntryId from "./../../helpers/findEntryId";
import getVotes from "./../../helpers/getVotes";
import isVoted from "./../../helpers/isVoted";
import voteIcon from "../../images/vote.svg";
import votedIcon from "../../images/voted.svg";
import addUser from "../../images/add-user-white.svg";
import userImg from "../../images/user.png";
import {EllipsisOutlined} from "@ant-design/icons";
import getWInner from "../../helpers/getWInner";

export const Challengers = ({
  fetchChallenge,
  challenge,
  getMediaFiles,
  challengeId,
  isFetching,
  isOwner,
  role,
  voteChallenge,
  actorId,
  shouldFetchChallenge,
  submitChallengeWinner,
}) => {
  const [search, setSearch] = useState("");
  const [activeRow, setActiveRow] = useState("");

  const mediaDetails = challenge?.challengeState.striveParticipantEntryArray;
  const challengeOwnerId =
    challenge?.challengeState.challengeDefinition.challengeOwnerHandle.actorId;
  const mediaFiles = challenge?.mediaFiles
    ? challenge.mediaFiles.filter((file) =>
        file.details.actorHandle.assetId.id.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  useEffect(() => {
    // works only after render
    fetchChallenge({challengeId});
  }, [fetchChallenge, challengeId]);

  useEffect(() => {
    // works after voting
    if (shouldFetchChallenge) {
      fetchChallenge({challengeId});
    }
  }, [shouldFetchChallenge, fetchChallenge, challengeId]);

  useEffect(() => {
    if (mediaDetails && challengeOwnerId && mediaDetails.length !== 0) {
      getMediaFiles({
        challengeId,
        challengeOwnerId,
        mediaDetails,
      });
    }
  }, [challengeId, getMediaFiles, mediaDetails, challengeOwnerId]);
  const winnerName = getWInner(challenge.challengeState);
  console.log(winnerName);

  return (
    <main className={styles.main}>
      {isFetching && <Spinner />}
      <Search value={search} setValue={setSearch} />
      <div className={styles.challengers}>
        {mediaFiles &&
          mediaFiles.map((file) => {
            const entryId = findEntryId(mediaDetails, file.details.mediaId.id);
            const shouldBlockVote = isVoted(
              challenge.challengeState.voteParticipantEntryArray,
              entryId,
              actorId
            );
            const isActive = file.details.mediaId.id === activeRow;
            return (
              <div
                className={`${styles.wrap} ${isActive ? styles.wrapActive : ""}`}
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
                  {!isOwner && role !== "CHALLENGER" && (
                    <Button
                      onClick={() =>
                        !shouldBlockVote
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
                        <img src={votedIcon} alt="Voted" className={styles.voteIcon} />
                      ) : (
                        <img src={voteIcon} alt="Vote" className={styles.voteIcon} />
                      )}
                      <span className={styles.voteWording}>
                        {shouldBlockVote ? "Voted" : "Vote"}
                      </span>
                    </Button>
                  )}
                  {isOwner &&
                    !winnerName(
                      <span onClick={() => setActiveRow(file.details.mediaId.id)}>
                        <EllipsisOutlined />
                      </span>
                    )}
                </div>
                {isActive && (
                  <Button
                    type="primary"
                    className={styles.winnerBtn}
                    onClick={() =>
                      submitChallengeWinner({
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
