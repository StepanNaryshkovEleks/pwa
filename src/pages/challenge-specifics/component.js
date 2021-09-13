import React, {useEffect, useState} from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import userImg from "../../images/user.png";
import backIcon from "../../images/chevron-left.svg";
import {Link, useHistory} from "react-router-dom";
import {Tabs, Progress} from "antd";
import styles from "./_.module.css";
import CNST from "../../constants";
import ChallengeActivities from "../../components/challenge-activities";
import Challengers from "../../components/challengers";
import ChallengeOwnerActivities from "../../components/challenge-owner-activities";
import ChallengeInformation from "../../components/challenge-information";

const {TabPane} = Tabs;

const BackIcon = ({className, onClick}) => (
  <button className={styles.goBack} onClick={onClick}>
    <img src={backIcon} alt="Go back" className={className} />
  </button>
);
const UserImage = ({userImg, className}) => (
  <Link to={CNST.ROUTES.PROFILE}>
    <img src={userImg} alt="User" className={className} />
  </Link>
);

export const ChallengeSpecifics = ({
  location,
  voteChallenge,
  user,
  clearChallenge,
  fetchChallenge,
  getMediaFile,
  challenge,
  mediaFiles,
}) => {
  const history = useHistory();
  const [isMediaFetched, setMediaFetched] = useState(false);
  const challengeId = location.state.challengeId;
  const isOwner = location.state.isOwner;
  const role = location.state.role;
  const title = isOwner ? "Created Challenge" : "Vee Challenge";
  const mediaDetails = challenge?.challengeState?.striveParticipantEntryArray;
  const challengeOwnerId =
    challenge?.challengeState.challengeDefinition.challengeOwnerHandle.actorId;
  const loadedFiles = Object.values(mediaFiles).filter((el) => !el.fetching);
  const percent = mediaDetails ? (loadedFiles.length * 100) / mediaDetails.length : 0;

  useEffect(() => {
    fetchChallenge({challengeId});
  }, [fetchChallenge, challengeId]);

  useEffect(() => {
    if (
      mediaDetails &&
      challengeOwnerId &&
      mediaDetails.length !== 0 &&
      !isMediaFetched
    ) {
      setMediaFetched(true);
      mediaDetails.map((media) => {
        getMediaFile({
          securityToken: user.securityToken,
          challengeId,
          challengeOwnerId,
          mediaOwnerId: media.participantId,
          mediaId: media.striveMediaId.id,
        });
      });
    }
  }, [challengeId, getMediaFile, mediaDetails, challengeOwnerId, isMediaFetched, user]);

  useEffect(() => {
    return () => clearChallenge();
  }, [clearChallenge]);

  return (
    <div className={styles.challenges}>
      <Header
        title={`${title}`}
        LeftComponent={(props) => BackIcon({...props, onClick: () => history.goBack()})}
        RightComponent={(props) => UserImage({...props, userImg})}
      />
      <Tabs
        className={`${styles.tabs} ${isOwner ? styles.tabsOwner : ""}`}
        tabPosition={"top"}
        centered={true}
        defaultActiveKey={location.state.defaultTab}
      >
        <TabPane tab="Activities" key={CNST.ROUTES.CHALLENGE_ACTIVITIES_TAB}>
          {isOwner ? (
            <ChallengeOwnerActivities
              challengeId={challengeId}
              role={role}
              actorId={user.actorHandle.actorId}
            />
          ) : (
            <ChallengeActivities
              isOwner={false}
              role={role}
              actorId={user.actorHandle.actorId}
              challengeId={challengeId}
              mediaDetails={mediaDetails}
              mediaFiles={mediaFiles}
            />
          )}
        </TabPane>
        <TabPane tab="Challengers" key={CNST.ROUTES.CHALLENGE_CHALLENGERS_TAB}>
          <Challengers
            challengeId={challengeId}
            actorId={user.actorHandle.actorId}
            isChallengeOwner={isOwner}
            role={role}
            voteChallenge={voteChallenge}
          />
        </TabPane>
        <TabPane tab="Information" key={CNST.ROUTES.CHALLENGE_INFORMATION_TAB}>
          <ChallengeInformation challenge={challenge} />
        </TabPane>
      </Tabs>
      <Footer />
      {percent < 100 && <Progress percent={percent} showInfo={false} />}
    </div>
  );
};
