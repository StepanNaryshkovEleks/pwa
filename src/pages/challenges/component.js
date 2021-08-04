import React, {useEffect, useState} from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ChallengeDetails from "../../components/challengeDetails";
import {Tabs} from "antd";
import {Link} from "react-router-dom";
import CNST from "../../constants";
import settingsIcon from "../../images/settings.svg";
import userImg from "../../images/user.png";
import styles from "./_.module.css";

const {TabPane} = Tabs;

const SettingsIcon = ({className}) => (
  <Link to={CNST.ROUTES.SETTINGS}>
    <img src={settingsIcon} alt="Settings" className={className} />
  </Link>
);

const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

export const Challenges = ({fetchChallenges, challenges, fetching}) => {
  const [tab, setTab] = useState();

  useEffect(() => {
    if (!fetching && !challenges) {
      fetchChallenges();
    }
  }, [fetching, challenges, fetchChallenges]);

  return (
    <main className={styles.challenges}>
      <Header
        title="Challenges"
        LeftComponent={SettingsIcon}
        RightComponent={(props) => UserImage({...props, userImg})}
      />
      <Tabs
        className={styles.tabs}
        defaultActiveKey={tab}
        tabPosition={"top"}
        onChange={setTab}
        centered={true}
      >
        <TabPane tab="All" key="all">
          {challenges &&
            challenges.map((challenge, i) => (
              <ChallengeDetails key={i} data={challenge} />
            ))}
        </TabPane>
        <TabPane tab="Created" key="created"></TabPane>
        <TabPane
          tab={
            <>
              <span>Invites</span>
              <div className={styles.invitesIndicator} />
            </>
          }
          key="invites"
        ></TabPane>
        <TabPane tab="Active" key="active"></TabPane>
        <TabPane tab="Rejected" key="rejected"></TabPane>
        <TabPane tab="Voting" key="voting"></TabPane>
        <TabPane tab="Forfeit" key="forfeit"></TabPane>
      </Tabs>
      <Footer />
    </main>
  );
};
