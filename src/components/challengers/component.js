import React, {useEffect, useState} from "react";
import Search from "../../components/search";
import {Button} from "antd";
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
  challengeId,
  isOwner,
  role,
  voteChallenge,
  actorId,
  shouldFetchChallenge,
}) => {
  const [search, setSearch] = useState("");

  const mediaDetails = challenge?.challengeState.striveParticipantEntryArray;
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
