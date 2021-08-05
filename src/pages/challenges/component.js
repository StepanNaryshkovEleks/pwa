import React, {useEffect, useState} from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Search from "../../components/search";
import ChallengeDetails from "../../components/challengeDetails";
import {Tabs} from "antd";
import {Link} from "react-router-dom";
import CNST from "../../constants";
import settingsIcon from "../../images/settings.svg";
import userImg from "../../images/user.png";
import styles from "./_.module.css";
import Spinner from "../../components/spinner";

const {TabPane} = Tabs;

const SettingsIcon = ({className}) => (
  <Link to={CNST.ROUTES.SETTINGS}>
    <img src={settingsIcon} alt="Settings" className={className} />
  </Link>
);

const UserImage = ({userImg, className}) => (
  <img src={userImg} alt="User" className={className} />
);

export const Challenges = ({fetchChallenges, challengesWithDetails, fetching}) => {
  const [tab, setTab] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchChallenges({
      withDetails: true,
    });
  }, [fetchChallenges]);

  return (
    <main className={styles.challenges}>
      {fetching && <Spinner />}
      <Header
        title="Challenges"
        LeftComponent={SettingsIcon}
        RightComponent={(props) => UserImage({...props, userImg})}
      />
      <Search value={search} setValue={setSearch} />
      <Tabs
        className={styles.tabs}
        defaultActiveKey={tab}
        tabPosition={"top"}
        onChange={setTab}
        centered={true}
      >
        <TabPane tab="All" key="all">
          {challengesWithDetails.all.map((challenge, i) => (
            <ChallengeDetails key={i} data={challenge} />
          ))}
        </TabPane>
        <TabPane tab="Created" key="created">
          {challengesWithDetails.created.map((challenge, i) => (
            <ChallengeDetails key={i} data={challenge} />
          ))}
        </TabPane>
        <TabPane
          tab={
            <>
              <span>Invites</span>
              <div className={styles.invitesIndicator} />
            </>
          }
          key="invites"
        >
          {challengesWithDetails.invites.map((challenge, i) => (
            <ChallengeDetails key={i} data={challenge} />
          ))}
        </TabPane>
        <TabPane tab="Active" key="active">
          {challengesWithDetails.active.map((challenge, i) => (
            <ChallengeDetails key={i} data={challenge} />
          ))}
        </TabPane>
        <TabPane tab="Rejected" key="rejected">
          {challengesWithDetails.rejected.map((challenge, i) => (
            <ChallengeDetails key={i} data={challenge} />
          ))}
        </TabPane>
        <TabPane tab="Voting" key="voting" />
        <TabPane tab="Forfeit" key="forfeit" />
      </Tabs>
      <Footer />
    </main>
  );
};
