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
import userImg from "../../images/user.png";

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
}) => {
  const [search, setSearch] = useState("");

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

  return (
    <main className={styles.main}>
      {isFetching && <Spinner />}
      <Search value={search} setValue={setSearch} />
      <div className={styles.challengers}>
        {mediaFiles &&
          mediaFiles.map((file) => {
            const voteEntryId = findEntryId(mediaDetails, file.details.mediaId.id);
            const shouldBlockVote = isVoted(
              challenge.challengeState.voteParticipantEntryArray,
              voteEntryId,
              actorId
            );
            return (
              <div className={styles.challenger} key={file.details.mediaId.id}>
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
                  <video
                    className={styles.media}
                    id="videoId"
                    src={URL.createObjectURL(file.mediaFile)}
                    muted
                  />
                </div>
                {!isOwner && role !== "CHALLENGER" && (
                  <Button
                    onClick={() =>
                      !shouldBlockVote
                        ? voteChallenge({
                            actorId,
                            challengeReference: {challengeId},
                            voteEntryId,
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
              </div>
            );
          })}
      </div>
    </main>
  );
};
