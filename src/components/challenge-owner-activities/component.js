import React, {useEffect, useState, createRef} from "react";
import styles from "./_.module.css";
import userImg from "../../images/user.png";
import ChallengeActivities from "../challenge-activities";

const statusMap = {
  INVITED: "Invited to this Challenge",
  DISENGAGED: "Rejected Challenge",
  ENGAGED: "Accepted Challenge",
  UPLOADED: "Uploaded Video",
};

export const ChallengeOwnerActivities = ({challenge, challengeId, role, actorId}) => {
  const [showMedia, setShowMedia] = useState(false);
  const participants = challenge?.challengeState.participantArray || [];
  const mediaFiles = challenge?.mediaFiles || [];

  const invited = participants.map((user) => ({
    ...user,
    participantStatus: "INVITED",
  }));
  const rejected = participants.filter((user) => user.participantStatus === "DISENGAGED");
  const accepted = participants.filter((user) => user.participantStatus === "ENGAGED");
  const uploaded = mediaFiles.map((file) => ({
    ...file,
    participantStatus: "UPLOADED",
    participantName: file.details.actorHandle.assetId.id,
  }));

  const data = [...uploaded, ...accepted, ...rejected, ...invited];
  const refs = mediaFiles.map(() => createRef());

  useEffect(() => {
    refs.forEach((ref) => {
      if (ref.current) {
        ref.current.pause(); // this hack needs for mobile safari which does not show first frame
      }
    });
  }, [refs]);

  return (
    <main className={`${styles.main} ${showMedia ? styles.noScroll : ""}`}>
      {showMedia && (
        <div className={styles.singleMedia} onClick={() => setShowMedia(false)}>
          <ChallengeActivities
            mediaFiles={showMedia}
            singleView
            actorId={actorId}
            role={role}
            isOwner={true}
            challengeId={challengeId}
            onClose={() => setShowMedia(false)}
          />
        </div>
      )}
      {data &&
        data.map((user, i) => (
          <div className={styles.user} key={i}>
            <img src={userImg} alt="User" className={styles.userImg} />
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.participantName}</span>
              <span className={styles.userStatus}>
                {statusMap[user.participantStatus]}
              </span>
            </div>
            {user.participantStatus === "UPLOADED" && (
              <div className={styles.mediaContainer} onClick={() => setShowMedia([user])}>
                {user.mediaType.mime.includes("video") ? (
                  <video
                    playsInline
                    className={styles.media}
                    muted
                    preload="metadata"
                    autoPlay
                    ref={refs[i]}
                  >
                    <source src={URL.createObjectURL(user.mediaFile)} />
                  </video>
                ) : (
                  <img
                    className={styles.media}
                    src={URL.createObjectURL(user.mediaFile)}
                    alt="Content"
                  />
                )}
              </div>
            )}
          </div>
        ))}
    </main>
  );
};
