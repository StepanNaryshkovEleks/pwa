import React, {useEffect, useState} from "react";
import Search from "../../components/search";
import {Button} from "antd";
import styles from "./_.module.css";

import voteIcon from "../../images/vote.svg";
import userImg from "../../images/user.png";

export const Challengers = ({fetchChallenge, challenge, getMediaFiles, challengeId}) => {
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
    fetchChallenge({challengeId});
  }, [fetchChallenge, challengeId]);

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
      <Search value={search} setValue={setSearch} />
      <div className={styles.challengers}>
        {mediaFiles &&
          mediaFiles.map((file) => (
            <div className={styles.challenger} key={file.details.mediaId.id}>
              <img src={userImg} alt="User" className={styles.userImg} />
              <div className={styles.challengerInfo}>
                <span className={styles.userName}>
                  {file.details.actorHandle.assetId.id}
                </span>
                <span className={styles.votes}>128,671 votes</span>
              </div>
              <div className={styles.mediaContainer}>
                <video
                  className={styles.media}
                  id="videoId"
                  src={URL.createObjectURL(file.mediaFile)}
                  muted
                />
              </div>
              <Button>
                <img src={voteIcon} alt="Vote" className={styles.voteIcon} />
                <span className={styles.voteWording}>Vote</span>
              </Button>
            </div>
          ))}
      </div>
    </main>
  );
};
