import React, {useEffect} from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Spinner from "../../components/spinner";
import userImg from "../../images/user.png";
import backIcon from "../../images/chevron-left.svg";
import {useHistory} from "react-router-dom";
import {Tabs} from "antd";
import styles from "./_.module.css";
import CNST from "../../constants";
import ChallengeActivities from "../../components/challenge-activities";
import Challengers from "../../components/challengers";

const {TabPane} = Tabs;

const BackIcon = ({className, onClick}) => (
  <button className={styles.goBack} onClick={onClick}>
    <img src={backIcon} alt="Go back" className={className} />
  </button>
);
const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

export const ChallengeSpecifics = ({
  location,
  voteChallenge,
  user,
  clearChallenge,
  fetchChallenge,
  getMediaFiles,
  challenge,
  isFetching,
}) => {
  const history = useHistory();
  const challengeId = location.state.challengeId;
  const isOwner = location.state.isOwner;
  const role = location.state.role;
  const title = isOwner ? "Created Challenge" : "Vee Challenge";
  const mediaDetails = challenge?.challengeState.striveParticipantEntryArray;
  const challengeOwnerId =
    challenge?.challengeState.challengeDefinition.challengeOwnerHandle.actorId;

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

  useEffect(() => {
    return () => clearChallenge();
  }, [clearChallenge]);

  return (
    <div className={styles.challenges}>
      {isFetching && <Spinner />}
      <Header
        title={`${title} ${challengeId}`}
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
          <ChallengeActivities challengeId={challengeId} />
        </TabPane>
        <TabPane tab="Challengers" key={CNST.ROUTES.CHALLENGE_CHALLENGERS_TAB}>
          <Challengers
            challengeId={challengeId}
            actorId={user.actorHandle.actorId}
            isOwner={isOwner}
            role={role}
            voteChallenge={voteChallenge}
          />
        </TabPane>
        <TabPane tab="Information" key={CNST.ROUTES.CHALLENGE_INFORMATION_TAB}>
          Information
        </TabPane>
      </Tabs>
      <Footer />
    </div>
  );
};
