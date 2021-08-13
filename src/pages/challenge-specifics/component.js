import React from "react";
import Header from "../../components/header";
import userImg from "../../images/user.png";
import backIcon from "../../images/chevron-left.svg";
import {useHistory} from "react-router-dom";
import {Tabs} from "antd";
import styles from "./_.module.css";
import CNST from "../../constants";
import ChallengeActivities from "../../components/challenge-activities";

const {TabPane} = Tabs;

const BackIcon = ({className, onClick}) => (
  <button className={styles.goBack} onClick={onClick}>
    <img src={backIcon} alt="Go back" className={className} />
  </button>
);
const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

export const ChallengeSpecifics = ({location}) => {
  const history = useHistory();
  const challengeId = location.state.challengeId;
  const isOwner = location.state.isOwner;
  const title = isOwner ? "Created Challenge" : "Vee Challenge";

  return (
    <div className={styles.challenges}>
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
          <ChallengeActivities />
        </TabPane>
        <TabPane tab="Challengers" key={CNST.ROUTES.CHALLENGE_CHALLENGERS_TAB}>
          Challengers
        </TabPane>
        <TabPane tab="Information" key={CNST.ROUTES.CHALLENGE_INFORMATION_TAB}>
          Information
        </TabPane>
      </Tabs>
    </div>
  );
};
